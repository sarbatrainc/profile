/**
 * Generates the social preview image (public/og-image.png, 1200x630) and the
 * Apple touch icon (public/apple-icon.png, 180x180) by rendering the templates
 * in scripts/*.html with headless Chrome and saving the screenshots.
 *
 * Uses the browser that is already installed — no image library dependency.
 *
 *   node scripts/generate-og.mjs
 *
 * If the name, title or domain change in src/config/site.config.ts, update the
 * defaults below to match, or pass them in as environment variables:
 *
 *   $env:OG_NAME="Raghav Ghimire"; node scripts/generate-og.mjs
 */
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const WIDTH = 1200;
const HEIGHT = 630;
const ICON_SIZE = 180;

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);

const chrome = CHROME_CANDIDATES.find((path) => existsSync(path));

if (!chrome) {
  console.error(
    "No Chrome or Edge binary found. Set CHROME_PATH to a browser executable, or generate the images manually:\n" +
      "  - public/og-image.png    1200x630\n" +
      "  - public/apple-icon.png  180x180",
  );
  process.exit(1);
}

const config = {
  name: process.env.OG_NAME ?? "Raghav Ghimire",
  title: process.env.OG_TITLE ?? "Flutter & Full-Stack Developer",
  footer: process.env.OG_FOOTER ?? "Flutter • Dart • Laravel • PostgreSQL • REST APIs",
  chips: (process.env.OG_CHIPS ?? "Flutter,Dart,Laravel,PostgreSQL,REST API").split(","),
};

const render = (html, width, height, outputPath) => {
  const workDir = mkdtempSync(join(tmpdir(), "og-"));
  const htmlPath = join(workDir, "card.html");

  mkdirSync(resolve("public"), { recursive: true });
  writeFileSync(htmlPath, html, "utf8");

  execFileSync(
    chrome,
    [
      "--headless",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      `--window-size=${width},${height}`,
      `--screenshot=${outputPath}`,
      `file:///${htmlPath.replace(/\\/g, "/")}`,
    ],
    { stdio: "ignore" },
  );

  rmSync(workDir, { recursive: true, force: true });

  if (!existsSync(outputPath)) {
    throw new Error(`Screenshot was not written to ${outputPath}`);
  }

  const { size } = statSync(outputPath);
  console.log(`  ${outputPath} (${width}x${height}, ${Math.round(size / 1024)} KB)`);
};

const ogTemplate = readFileSync(resolve("scripts/og-template.html"), "utf8");
const ogHtml = ogTemplate
  .replace("{{NAME}}", config.name)
  .replace("{{TITLE}}", config.title)
  .replace("{{FOOTER}}", config.footer)
  .replace(
    "{{CHIPS}}",
    config.chips.map((chip) => `<span class="chip">${chip.trim()}</span>`).join("\n        "),
  );

const iconTemplate = readFileSync(resolve("scripts/apple-icon-template.html"), "utf8");

console.log("Generating social images...");

await render(ogHtml, WIDTH, HEIGHT, resolve("public/og-image.png"));
await render(iconTemplate, ICON_SIZE, ICON_SIZE, resolve("public/apple-icon.png"));

console.log("Done.");
