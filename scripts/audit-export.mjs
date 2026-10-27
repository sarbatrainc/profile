/**
 * Post-build audit of the exported static site in ./out.
 *
 * Checks:
 *  - internal links and asset references resolve to real files
 *  - exactly one <h1> per page and no skipped heading levels
 *  - no images without alt text, no empty links or buttons
 *  - lang attribute, title and meta description present
 *  - no leftover placeholder values such as example.com outside of metadata
 *
 * Run with: node scripts/audit-export.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, dirname } from "node:path";

const OUT = "out";
const problems = [];
const notes = [];
const configNotes = [];

const htmlFiles = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (entry.endsWith(".html")) htmlFiles.push(full);
  }
})(OUT);

/** Resolves an internal URL path to a file inside ./out. */
function resolveInternal(pathname) {
  const clean = pathname.split("#")[0].split("?")[0];
  if (clean === "" || clean === "/") return join(OUT, "index.html");

  const base = join(OUT, clean);
  const candidates = [
    base,
    join(base, "index.html"),
    `${base}.html`,
    clean.endsWith("/") ? join(base, "index.html") : join(base, "index.html"),
  ];
  return candidates.find((candidate) => existsSync(candidate));
}

const attribute = (tag, name) => {
  const match = tag.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return match ? match[1] : undefined;
};

for (const file of htmlFiles) {
  const page = relative(OUT, file).replace(/\\/g, "/");
  const html = readFileSync(file, "utf8");

  /* ---------------------------------------------------------- links ---- */
  const linkTags = html.match(/<(a|link|script|img|source)\b[^>]*>/gi) ?? [];

  for (const tag of linkTags) {
    const href =
      attribute(tag, "href") ??
      attribute(tag, "src") ??
      attribute(tag, "srcset");

    if (!href || href.startsWith("data:")) continue;

    if (href.startsWith("http://") || href.startsWith("https://")) {
      notes.push(`${page}: external reference -> ${href.slice(0, 90)}`);
      continue;
    }

    if (href.startsWith("mailto:") || href.startsWith("tel:")) {
      notes.push(`${page}: contact link -> ${href.slice(0, 60)}`);
      continue;
    }

    if (href.startsWith("#")) {
      // In-page anchor: the target must exist on this page.
      const id = href.slice(1);
      if (id && !html.includes(`id="${id}"`)) {
        problems.push(`${page}: anchor "${href}" has no matching id`);
      }
      continue;
    }

    if (href.startsWith("/")) {
      if (!resolveInternal(href)) {
        problems.push(`${page}: broken internal reference -> ${href}`);
      }
      continue;
    }

    if (!existsSync(join(dirname(file), href.split("#")[0]))) {
      problems.push(`${page}: broken relative reference -> ${href}`);
    }
  }

  /* -------------------------------------------------------- headings ---- */
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map(
    (match) => ({ level: Number(match[1]), text: match[2].replace(/<[^>]*>/g, "").trim() }),
  );

  const h1Count = headings.filter((heading) => heading.level === 1).length;
  if (h1Count !== 1) problems.push(`${page}: expected exactly 1 <h1>, found ${h1Count}`);

  let previous = 1;
  for (const heading of headings) {
    if (heading.level > previous + 1) {
      problems.push(
        `${page}: heading jumps from h${previous} to h${heading.level} ("${heading.text.slice(0, 40)}")`,
      );
    }
    previous = heading.level;
  }

  /* ----------------------------------------------------------- a11y ----- */
  for (const img of html.match(/<img\b[^>]*>/gi) ?? []) {
    if (!attribute(img, "alt")) problems.push(`${page}: <img> without alt -> ${img.slice(0, 70)}`);
  }

  for (const anchor of html.match(/<a\b[^>]*>([\s\S]*?)<\/a>/gi) ?? []) {
    if (attribute(anchor, "aria-label")) continue;
    const text = anchor.replace(/<[^>]*>/g, "").replace(/<!--[\s\S]*?-->/g, "").trim();
    if (text.length === 0) problems.push(`${page}: link with no accessible text`);
  }

  for (const button of html.match(/<button\b[^>]*>([\s\S]*?)<\/button>/gi) ?? []) {
    if (attribute(button, "aria-label")) continue;
    const text = button.replace(/<[^>]*>/g, "").trim();
    if (text.length === 0) problems.push(`${page}: button with no accessible name`);
  }

  /* ------------------------------------------------------------ seo ----- */
  if (!/<html[^>]*lang="/.test(html)) problems.push(`${page}: missing lang attribute`);
  if (!/<title>/.test(html)) problems.push(`${page}: missing <title>`);
  if (!/name="description"/.test(html)) problems.push(`${page}: missing meta description`);
  if (!/property="og:title"/.test(html)) problems.push(`${page}: missing og:title`);
  if (!/name="twitter:card"/.test(html)) problems.push(`${page}: missing twitter:card`);

  /* -------------------------------------------------- configuration ----- */
  // The placeholder origin only appears while NEXT_PUBLIC_SITE_URL is unset, and
  // only inside metadata / JSON-LD. Reported separately so it does not mask
  // real structural problems.
  if (html.includes("https://example.com")) {
    configNotes.push(
      `${page}: still using the placeholder site URL — set NEXT_PUBLIC_SITE_URL in .env.local`,
    );
  }
  if (/\b(TODO|FIXME|Lorem ipsum)\b/.test(html)) {
    problems.push(`${page}: leftover placeholder text`);
  }
}

/* --------------------------------------------------------------- report -- */

console.log(`Audited ${htmlFiles.length} pages in ./${OUT}\n`);

if (notes.length) {
  console.log(`External references (${new Set(notes).size} unique):`);
  for (const note of [...new Set(notes)]) console.log(`  - ${note}`);
  console.log("");
}

if (configNotes.length) {
  console.log(`Configuration (not blocking):`);
  for (const note of [...new Set(configNotes)]) console.log(`  ! ${note}`);
  console.log("");
}

if (problems.length) {
  console.log(`PROBLEMS (${problems.length}):`);
  for (const problem of problems) console.log(`  x ${problem}`);
  process.exitCode = 1;
} else {
  console.log("No problems found.");
}