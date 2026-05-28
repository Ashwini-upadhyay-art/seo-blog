/**
 * Generates the raster images that can't be SVG:
 *   - og-default.png        (1200x630)  social share card — SVG won't render on FB/Twitter
 *   - apple-touch-icon.png  (180x180)
 *   - icon-192.png / icon-512.png  (PWA manifest)
 *   - favicon-32.png        (legacy favicon)
 *
 * Re-run after rebranding:  node scripts/generate-images.mjs
 */
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const pub = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public");

// --- Branding (edit these if you rename the site) ---
const TITLE = "Wander & Well";
const TAGLINE = "Travel, food & slow-living stories";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#c2410c"/>
      <stop offset="1" stop-color="#7c2d12"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="80" y="320" font-family="Georgia, 'DejaVu Serif', serif" font-size="96" font-weight="700" fill="#ffffff">${esc(TITLE)}</text>
  <text x="84" y="400" font-family="'DejaVu Sans', sans-serif" font-size="40" fill="#ffe8db">${esc(TAGLINE)}</text>
</svg>`;

const iconSvg = await readFile(path.join(pub, "favicon.svg"));

await sharp(Buffer.from(ogSvg)).png().toFile(path.join(pub, "og-default.png"));

const iconSizes = [
  ["apple-touch-icon.png", 180],
  ["icon-192.png", 192],
  ["icon-512.png", 512],
  ["favicon-32.png", 32],
];
for (const [name, size] of iconSizes) {
  await sharp(iconSvg)
    .resize(size, size)
    .png()
    .toFile(path.join(pub, name));
}

console.log("Generated:", ["og-default.png", ...iconSizes.map((i) => i[0])].join(", "));
