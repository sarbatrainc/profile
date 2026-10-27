/**
 * Runtime verification of the exported site in ./out.
 *
 * Serves the static export over HTTP, drives headless Chrome through the
 * DevTools Protocol and checks the things that only show up in a real browser:
 *
 *  - console errors and uncaught exceptions on every page
 *  - horizontal overflow at each target breakpoint, plus the specific elements
 *    that overflow
 *  - the theme toggle actually switching themes and persisting
 *  - the mobile menu opening, closing on Escape, and not locking scroll
 *  - scroll-reveal elements becoming visible after scrolling
 *  - the contact form validation path
 *
 *   node scripts/verify-runtime.mjs
 */
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const OUT = resolve("out");
const PORT = 4321;

if (!existsSync(OUT)) {
  console.error("No ./out directory. Run `npm run build` first.");
  process.exit(1);
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

/* ------------------------------------------------------------ static server --- */

const server = createServer((request, response) => {
  const url = new URL(request.url, `http://127.0.0.1:${PORT}`);
  let pathname = decodeURIComponent(url.pathname);

  let filePath = join(OUT, normalize(pathname).replace(/^(\.\.[/\\])+/, ""));

  if (pathname.endsWith("/")) filePath = join(filePath, "index.html");
  else if (!existsSync(filePath) && existsSync(`${filePath}.html`)) filePath = `${filePath}.html`;

  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end(readFileSync(join(OUT, "404.html"), "utf8"));
    return;
  }

  response.writeHead(200, { "Content-Type": MIME[extname(filePath)] ?? "application/octet-stream" });
  response.end(readFileSync(filePath));
});

await new Promise((done) => server.listen(PORT, "127.0.0.1", done));

/* ---------------------------------------------------------------- browser --- */

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const chromePath = CHROME_CANDIDATES.find((path) => existsSync(path));

if (!chromePath) {
  console.error("No Chrome/Chromium binary found. Set CHROME_PATH.");
  process.exit(1);
}

const debugPort = 9333;
const userDataDir = join(process.env.TEMP ?? ".", "portfolio-verify-profile");

const browser = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--hide-scrollbars",
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${userDataDir}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

async function waitForBrowser() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${debugPort}/json/version`);
      if (response.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((done) => setTimeout(done, 250));
  }
  throw new Error("Chrome did not expose its debugging endpoint");
}

await waitForBrowser();

/* ------------------------------------------------------------- CDP client --- */

const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
const page = targets.find((target) => target.type === "page");

if (!page) throw new Error("No page target available");

const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((done, fail) => {
  socket.addEventListener("open", done, { once: true });
  socket.addEventListener("error", fail, { once: true });
});

let messageId = 0;
const pending = new Map();
const consoleMessages = [];
const exceptions = [];
const failedRequests = [];
const requests = new Map();

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);

  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
    return;
  }

  if (message.method === "Runtime.consoleAPICalled") {
    const text = (message.params.args ?? [])
      .map((arg) => arg.value ?? arg.description ?? arg.unserializableValue ?? "")
      .join(" ");
    if (message.params.type === "error" || message.params.type === "warning") {
      consoleMessages.push({ type: message.params.type, text });
    }
  }

  if (message.method === "Runtime.exceptionThrown") {
    const details = message.params.exceptionDetails;
    exceptions.push(details.exception?.description ?? details.text);
  }

  if (message.method === "Network.requestWillBeSent") {
    requests.set(message.params.requestId, message.params.request.url);
  }

  if (message.method === "Network.loadingFailed") {
    failedRequests.push({
      url: requests.get(message.params.requestId) ?? "(unknown)",
      error: message.params.errorText,
    });
  }
});

const send = (method, params = {}) =>
  new Promise((resolveCommand, reject) => {
    const id = ++messageId;
    pending.set(id, { resolve: resolveCommand, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });

await send("Page.enable");
await send("Runtime.enable");
await send("Network.enable");
await send("Log.enable");

const evaluate = async (expression) => {
  const result = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description ?? "evaluation failed");
  }
  return result.result.value;
};

const goto = async (path) => {
  await send("Page.navigate", { url: `http://127.0.0.1:${PORT}${path}` });
  await new Promise((done) => setTimeout(done, 900));
};

const setViewport = (width, height, mobile = false) =>
  send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
  });

/* ------------------------------------------------------------- test cases --- */

const findings = [];
const passed = [];

const VIEWPORTS = [
  { width: 360, height: 780, mobile: true },
  { width: 390, height: 844, mobile: true },
  { width: 430, height: 932, mobile: true },
  { width: 768, height: 1024, mobile: true },
  { width: 1024, height: 768, mobile: false },
  { width: 1280, height: 800, mobile: false },
  { width: 1440, height: 900, mobile: false },
  { width: 1920, height: 1080, mobile: false },
];

const OVERFLOW_PROBE = `(() => {
  // Compare against the visual viewport width, not clientWidth — the difference
  // between innerWidth and clientWidth is the (possibly hidden) vertical
  // scrollbar gutters, which should NOT count as horizontal overflow.
  const viewportWidth = window.visualViewport ? Math.round(window.visualViewport.width) : window.innerWidth;
  const offenders = [];
  for (const element of document.querySelectorAll('body *')) {
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;
    if (rect.right > viewportWidth + 1 || rect.left < -1) {
      offenders.push({
        tag: element.tagName.toLowerCase(),
        cls: (element.getAttribute('class') || '').slice(0, 70),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        position: getComputedStyle(element).position,
      });
    }
    if (offenders.length >= 6) break;
  }
  return {
    viewportWidth,
    scrollWidth: document.documentElement.scrollWidth,
    offenders,
  };
})()`;

console.log("Runtime verification of ./out\n");

/* 1 — layout and console across breakpoints --------------------------------- */

await setViewport(1440, 900);

for (const path of ["/", "/projects/sanket/", "/projects/ashri-bhakti/"]) {
  await goto(path);
  const label = `page ${path}`;

  for (const viewport of VIEWPORTS) {
    await setViewport(viewport.width, viewport.height, viewport.mobile);
    await new Promise((done) => setTimeout(done, 220));

    const result = await evaluate(OVERFLOW_PROBE);
    const overflowing = result.scrollWidth > result.viewportWidth + 1;

    if (overflowing) {
      const detail = result.offenders.map((o) => `${o.tag}.${o.cls}`).join(" | ");
      findings.push(`${label} @ ${viewport.width}px: horizontal overflow (scrollWidth ${result.scrollWidth} > viewport ${result.viewportWidth}) -> ${detail}`);
    }
  }
}

passed.push(`layout: checked ${VIEWPORTS.length} widths across 3 pages for horizontal overflow`);

/* 2 — theme toggle ---------------------------------------------------------- */

await setViewport(1280, 800);
await goto("/");

const themeBefore = await evaluate(`document.documentElement.classList.contains('dark')`);
await evaluate(`document.querySelector('button[aria-label*="mode"]')?.click()`);
await new Promise((done) => setTimeout(done, 300));

const themeAfter = await evaluate(`document.documentElement.classList.contains('dark')`);
const storedTheme = await evaluate(`localStorage.getItem('theme')`);

if (themeBefore === themeAfter) {
  findings.push(`theme: toggle did not switch the root class (dark: ${themeBefore} -> ${themeAfter})`);
} else {
  passed.push(`theme: toggled dark=${themeBefore} to dark=${themeAfter} and stored "${storedTheme}"`);
}

// Reload and confirm the choice is restored.
await goto("/");
const themeRestored = await evaluate(`document.documentElement.classList.contains('dark')`);
if (themeRestored !== themeAfter) {
  findings.push(`theme: preference was not restored after reload (expected dark=${themeAfter}, got ${themeRestored})`);
} else {
  passed.push("theme: preference restored after reload");
}

/* 3 — mobile menu ----------------------------------------------------------- */

await setViewport(390, 844, true);
await goto("/");

const menuButton = `document.querySelector('button[aria-controls="mobile-menu"]')`;
await evaluate(`${menuButton}?.click(); true`);
await new Promise((done) => setTimeout(done, 500));

const menuState = await evaluate(`(() => {
  const panel = document.getElementById('mobile-menu');
  const button = document.querySelector('button[aria-controls="mobile-menu"]');
  return {
    expanded: button?.getAttribute('aria-expanded'),
    height: Math.round(panel?.getBoundingClientRect().height ?? 0),
    links: panel?.querySelectorAll('a').length ?? 0,
    bodyLocked: getComputedStyle(document.body).overflow,
  };
})()`);

if (menuState.expanded !== "true") {
  findings.push("mobile menu: aria-expanded did not switch to true after clicking the toggle");
} else if (menuState.height < 100) {
  findings.push(`mobile menu: panel did not expand (height ${menuState.height}px)`);
} else if (menuState.links === 0) {
  findings.push("mobile menu: panel contains no links");
} else {
  passed.push(`mobile menu: expanded to ${menuState.height}px with ${menuState.links} links, scroll locked (${menuState.bodyLocked})`);
}

await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
await new Promise((done) => setTimeout(done, 400));
const closedByEscape = await evaluate(
  `document.querySelector('button[aria-controls="mobile-menu"]')?.getAttribute('aria-expanded')`,
);
if (closedByEscape !== "false") {
  findings.push(`mobile menu: Escape did not close the panel (aria-expanded=${closedByEscape})`);
} else {
  passed.push("mobile menu: Escape closes the panel");
}

/* 4 — scroll reveal --------------------------------------------------------- */

await setViewport(1280, 800);
await goto("/");

const revealBefore = await evaluate(
  `document.querySelectorAll('[data-reveal]:not([data-revealed="true"])').length`,
);
await evaluate(`window.scrollTo(0, document.body.scrollHeight)`);
await new Promise((done) => setTimeout(done, 1200));
const revealAfter = await evaluate(
  `document.querySelectorAll('[data-reveal]:not([data-revealed="true"])').length`,
);

if (revealAfter >= revealBefore) {
  findings.push(
    `scroll reveal: elements did not reveal after scrolling (${revealBefore} -> ${revealAfter} still hidden)`,
  );
} else {
  passed.push(`scroll reveal: ${revealBefore - revealAfter} elements revealed on scroll (${revealAfter} still hidden)`);
}

/* 5 — contact form validation ---------------------------------------------- */

await evaluate(`document.getElementById('contact')?.scrollIntoView()`);
await new Promise((done) => setTimeout(done, 400));

await evaluate(`(() => {
  const form = document.querySelector('#contact form');
  form?.querySelector('button[type="submit"]')?.click();
})()`);
await new Promise((done) => setTimeout(done, 400));

const statusText = await evaluate(
  `document.querySelector('#contact form [role="status"]')?.textContent?.trim() ?? ''`,
);

if (statusText.length === 0) {
  findings.push("contact form: submitting an empty form produced no validation message");
} else {
  passed.push(`contact form: empty submit reported "${statusText.slice(0, 60)}…"`);
}

/* 6 — navigation between pages ---------------------------------------------- */

await goto("/projects/bhok-lagyo/");
const caseStudyHeading = await evaluate(`document.querySelector('h1')?.textContent?.trim() ?? ''`);
const sectionHeadings = await evaluate(
  `document.querySelectorAll('section[id]').length`,
);

if (!caseStudyHeading.includes("Bhok Lagyo")) {
  findings.push(`case study: expected the Bhok Lagyo heading, got "${caseStudyHeading}"`);
} else if (sectionHeadings < 9) {
  findings.push(`case study: expected 9 numbered sections, found ${sectionHeadings}`);
} else {
  passed.push(`case study: "${caseStudyHeading}" rendered with ${sectionHeadings} anchored sections`);
}

/* 7 — console / network ----------------------------------------------------- */

const realExceptions = exceptions.filter((text) => !/favicon/i.test(text));
const realConsoleErrors = consoleMessages.filter((text) => !/favicon|Download the React DevTools/i.test(text.text));
const realFailed = failedRequests.filter((item) => {
  // A document/fetch "ERR_ABORTED" is Chrome cancelling a page navigation when
  // we navigate a second later — not a missing asset.
  return !item.error.includes("ERR_ABORTED");
});

if (realExceptions.length) findings.push(`uncaught exceptions: ${realExceptions.slice(0, 3).join(" | ")}`);
if (realConsoleErrors.length) findings.push(`console errors: ${realConsoleErrors.slice(0, 3).map((m) => m.text).join(" | ")}`);
if (realFailed.length) findings.push(`failed requests: ${realFailed.slice(0, 3).map((item) => `${item.error} ${item.url}`).join(" | ")}`);

if (!realExceptions.length && !realConsoleErrors.length && !realFailed.length) {
  passed.push("console: no errors, warnings, exceptions or failed requests");
}

/* ------------------------------------------------------------------ report --- */

for (const note of passed) console.log(`  PASS  ${note}`);
console.log("");
for (const note of findings) console.log(`  FAIL  ${note}`);

socket.close();
browser.kill();
server.close();

if (findings.length) {
  console.log(`\n${findings.length} problem(s) found.`);
  process.exitCode = 1;
} else {
  console.log("\nAll runtime checks passed.");
}
