import { SITE_URL } from "../consts";

/**
 * Build an absolute, canonical-consistent URL.
 *  - Page routes get a single trailing slash (matches the sitemap +
 *    `build.format: "directory"` output) so canonical = sitemap = served URL.
 *  - Files with an extension (.png, .xml, .json) keep no trailing slash.
 *  - Already-absolute URLs pass through untouched.
 */
export function abs(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const base = SITE_URL.replace(/\/$/, "");
  let p = path.startsWith("/") ? path : "/" + path;
  const hasExt = /\.[a-z0-9]+$/i.test(p);
  if (!hasExt && !p.endsWith("/")) p += "/";
  return base + p;
}

/** Site-relative page path with a single trailing slash. */
export function pagePath(path: string): string {
  let p = path.startsWith("/") ? path : "/" + path;
  if (!p.endsWith("/")) p += "/";
  return p;
}
