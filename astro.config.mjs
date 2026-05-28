// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  // IMPORTANT: set this to your real domain before deploying.
  // Must match SITE_URL in src/consts.ts. Used for canonical URLs,
  // sitemap, RSS and Open Graph tags.
  site: "https://seo-blog.ashwini-upadhy.workers.dev",
  output: "static",
  trailingSlash: "ignore",
  integrations: [
    mdx(),
    sitemap({
      // Per-URL crawl hints. Priority signals relative importance to Google.
      // (No global lastmod — a single build-time date on every URL is misleading.)
      changefreq: "weekly",
      priority: 0.7,
      serialize(item) {
        const p = new URL(item.url).pathname;
        if (p === "/") {
          item.priority = 1.0;
          item.changefreq = "daily";
        } else if (/^\/blog\/[^/]+\/$/.test(p)) {
          item.priority = 0.8; // individual posts
        } else if (p === "/blog/") {
          item.priority = 0.7;
          item.changefreq = "daily";
        } else if (p.startsWith("/categories/")) {
          item.priority = 0.6;
          item.changefreq = "daily";
        } else {
          item.priority = 0.5; // about, privacy, etc.
        }
        return item;
      },
    }),
  ],
  build: {
    // Cleaner URLs: /blog/my-post/ instead of /blog/my-post.html
    format: "directory",
  },
  image: {
    // Allow optimizing remote images from these hosts (e.g. Unsplash).
    domains: ["images.unsplash.com"],
  },
});
