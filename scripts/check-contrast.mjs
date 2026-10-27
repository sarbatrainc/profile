/**
 * Verifies WCAG contrast ratios for the palette in src/app/globals.css.
 *
 * Reads the real token values from both the :root (light) and .dark blocks,
 * converts OKLCH to sRGB and reports the contrast ratio for the text and
 * background combinations actually used in the UI.
 *
 *   node scripts/check-contrast.mjs
 */
import { readFileSync } from "node:fs";

const css = readFileSync("src/app/globals.css", "utf8");

/* ------------------------------------------------------- oklch -> srgb --- */

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function oklchToSrgb(L, C, hDeg) {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  return [r, g, bl].map((channel) => {
    const value = channel <= 0.0031308 ? channel * 12.92 : 1.055 * channel ** (1 / 2.4) - 0.055;
    return clamp(value, 0, 1);
  });
}

/** Accepts `oklch(72% 0.15 258)` and `oklch(72% 0.15 258 / 0.5)`. */
function parseColor(value) {
  const match = value.match(
    /oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)/,
  );
  if (!match) return null;

  const [, lightness, chroma, hue, alpha] = match;
  const rgb = oklchToSrgb(Number(lightness) / 100, Number(chroma), Number(hue));

  const resolvedAlpha = alpha === undefined ? 1 : parseFloat(alpha) / (alpha.endsWith("%") ? 100 : 1);
  return { rgb, alpha: resolvedAlpha };
}

/** Flattens a possibly translucent colour onto an opaque backdrop. */
function flatten(color, backdrop) {
  return color.rgb.map(
    (channel, index) => channel * color.alpha + backdrop[index] * (1 - color.alpha),
  );
}

function relativeLuminance([r, g, b]) {
  const [R, G, B] = [r, g, b].map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrast(foreground, background) {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

/* --------------------------------------------------------------- tokens --- */

function extractBlock(selector) {
  const index = css.indexOf(`${selector} {`);
  if (index === -1) throw new Error(`Block ${selector} not found`);
  const start = css.indexOf("{", index);
  const end = css.indexOf("}", start);
  const block = css.slice(start + 1, end);
  const tokens = {};

  for (const line of block.split("\n")) {
    const match = line.match(/^\s*(--[\w-]+):\s*(.+);\s*$/);
    if (match) tokens[match[1]] = match[2].trim();
  }
  return tokens;
}

const light = extractBlock(":root");
const dark = extractBlock(".dark");

const pairs = [
  { fg: "--foreground", bg: "--background", label: "body text on page", min: 4.5 },
  { fg: "--foreground-muted", bg: "--background", label: "muted text on page", min: 4.5 },
  { fg: "--foreground-muted", bg: "--surface", label: "muted text on card", min: 4.5 },
  { fg: "--foreground-subtle", bg: "--background", label: "subtle text on page", min: 4.5 },
  { fg: "--foreground-subtle", bg: "--surface-2", label: "subtle text on chip", min: 4.5 },
  { fg: "--accent", bg: "--background", label: "accent text on page", min: 4.5 },
  { fg: "--accent", bg: "--surface", label: "accent text on card", min: 4.5 },
  { fg: "--accent", bg: "--accent-soft", label: "completed badge", min: 4.5 },
  { fg: "--success", bg: "--success-soft", label: "implemented badge", min: 4.5 },
  { fg: "--warning", bg: "--warning-soft", label: "in-development badge", min: 4.5 },
  { fg: "--accent-on", bg: "--accent", label: "primary button label", min: 4.5 },
  { fg: "--foreground", bg: "--accent-soft", label: "text on accent-soft surface", min: 4.5 },
  { fg: "--whatsapp-on", bg: "--whatsapp", label: "whatsapp label on brand", min: 4.5 },
];

/* ------------------------------------------------------------------ run --- */

let failures = 0;

for (const [mode, tokens] of [
  ["light", light],
  ["dark", dark],
]) {
  console.log(`\n${mode.toUpperCase()} MODE`);

  for (const pair of pairs) {
    const fg = parseColor(tokens[pair.fg]);
    const bg = parseColor(tokens[pair.bg]);

    if (!fg || !bg) {
      console.log(`  ?    ${pair.label}: could not parse ${pair.fg} / ${pair.bg}`);
      failures += 1;
      continue;
    }

    const background = flatten(bg, [1, 1, 1]);
    const ratio = contrast(flatten(fg, background), background);
    const pass = ratio >= pair.min;
    if (!pass) failures += 1;

    console.log(
      `  ${pass ? "PASS" : "FAIL"}  ${ratio.toFixed(2).padStart(5)}:1  ${pair.label}`,
    );
  }
}

console.log("");
if (failures > 0) {
  console.log(`${failures} contrast check(s) below the required ratio.`);
  process.exitCode = 1;
} else {
  console.log("All contrast checks pass.");
}
