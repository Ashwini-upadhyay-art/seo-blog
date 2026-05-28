# Wander & Well — SEO-first blog starter

A fast, zero-JS blog built with **Astro 5**, ready to deploy free on **Cloudflare Pages**, with production-grade SEO and Google AdSense wired in.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs ./dist (this is what gets deployed)
npm run preview    # serve the production build locally
```

## Edit everything in one place

Open **`src/consts.ts`** — site title, description, author, social links, nav,
AdSense id, and Analytics id all live there. Change those and the whole site
(meta tags, structured data, footer, RSS) updates.

> After changing `SITE_URL`, also update `site:` in **`astro.config.mjs`** to the
> same value. Both must point at your real domain or canonical URLs / sitemap
> will be wrong.

## Writing a post

Drop a `.md` (or `.mdx`) file in `src/content/blog/`. The filename becomes the URL slug.

```markdown
---
title: "Your post title (<= 70 chars for full Google display)"
description: "150-160 char meta description — this is your SERP snippet."
pubDate: 2026-06-01
updatedDate: 2026-06-05        # optional, shows "Updated" + dateModified
heroImage: "https://images.unsplash.com/...&w=1200&q=70"
heroAlt: "Describe the image (accessibility + image SEO)"
category: "Travel"            # Travel | Food | Lifestyle (edit enum in content.config.ts)
tags: ["kyoto", "japan"]
sponsored: false              # true => adds disclosure banner
draft: false                  # true => hidden from production build
---

Your markdown content here.
```

Categories auto-generate pages at `/categories/<name>`. Add a new category by
editing the `enum` in `src/content.config.ts` and the nav in `src/consts.ts`.

---

## Deploy to Cloudflare Pages (free, unlimited bandwidth)

1. Push this folder to a GitHub repo.
2. Go to **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git**.
3. Pick the repo and set:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. You get a free `*.pages.dev` URL with SSL.
5. Add your custom domain under **Custom domains** (point your registrar's
   nameservers to Cloudflare, or add a CNAME — both free).
6. Update `SITE_URL` (consts.ts), `site` (astro.config.mjs) and the host in
   `public/robots.txt` to your real domain, then redeploy.

`public/_headers` already long-caches static assets and adds basic security headers.

---

## Monetization setup

### Google AdSense
1. Apply at [adsense.google.com](https://adsense.google.com) **after** you have
   ~15–20 quality posts plus About + Privacy + Contact pages (all included here).
2. Once approved, copy your publisher id (`ca-pub-...`) into `ADSENSE_CLIENT` in
   `src/consts.ts`, create ad units, and paste their slot ids into `AD_SLOTS`.
3. Ad units (`<AdSlot/>`) render **nothing** until configured, so they never hurt
   your layout or Lighthouse score during development.

### Affiliate + sponsored posts
- Set `sponsored: true` in a post's frontmatter to show an FTC-style disclosure.
- Good affiliate fits for this niche: hotel/flight booking, travel gear, kitchen
  products (Amazon Associates, Booking.com, etc.).

---

## The SEO toolkit (what makes this "unparalleled")

### Already built in (free, code-level)
| Signal | Where |
|---|---|
| Canonical URLs (trailing-slash consistent with sitemap) | `BaseHead.astro` + `src/lib/url.ts` |
| Open Graph + Twitter cards, with **PNG** images + dimensions | `BaseHead.astro` |
| Auto-generated **share/OG image** (`og-default.png`) | `scripts/generate-images.mjs` |
| JSON-LD: WebSite, Organization, BlogPosting (`wordCount`, `articleSection`, `inLanguage`), BreadcrumbList | `BaseHead.astro` + `BlogPost.astro` |
| JSON-LD: **Recipe** + **FAQPage** rich results (frontmatter-driven) | `content.config.ts` + `BlogPost.astro` |
| JSON-LD: CollectionPage + ItemList on blog/category pages | listing pages |
| JSON-LD: ProfilePage/Person on About (E-E-A-T) | `about.astro` |
| **Related posts** internal linking (same category) | `BlogPost.astro` |
| Reading time, visible breadcrumbs | `BlogPost.astro` |
| `sitemap-index.xml` with per-URL priorities | `@astrojs/sitemap` (config) |
| RSS feed (`/rss.xml`) | `src/pages/rss.xml.js` |
| `robots.txt`, web manifest, favicons + apple-touch-icon | `public/` |
| Semantic HTML, alt text, skip-link | layouts/components |
| Zero-JS pages → top Core Web Vitals | Astro default |

### Add rich results to a post (optional frontmatter)
Recipe and FAQ blocks generate Google rich results. Add to any post's frontmatter:

```yaml
faq:
  - question: "Can I make this vegan?"
    answer: "Yes — use vegetable stock and swap the cheese for nutritional yeast."
recipe:
  prepTime: "PT5M"      # ISO-8601 durations
  cookTime: "PT15M"
  totalTime: "PT20M"
  recipeYield: "2 servings"
  calories: "480 calories"
  ingredients: ["200g pasta", "1 lemon", "..."]
  instructions: ["Step one...", "Step two..."]
```

> Re-run `node scripts/generate-images.mjs` after you rename the site to
> regenerate the branded OG image and icons (edit the title/tagline at the top
> of that script first).

### Tools to plug in (all have free tiers)
1. **Google Search Console** — *non-negotiable.* Verify the domain, submit
   `sitemap-index.xml`, watch which queries you rank for. Free.
2. **Bing Webmaster Tools** — same idea for Bing/ChatGPT search; import directly
   from Search Console. Free.
3. **Google Analytics 4** — paste your `G-XXXX` id into `GA_MEASUREMENT_ID`
   (already wired in `BaseHead.astro`). Free. (Privacy-friendly alternative:
   Cloudflare Web Analytics — free, no cookie banner needed.)
4. **PageSpeed Insights / Lighthouse** — verify you're hitting 95–100. This stack
   should out of the box. Free.
5. **Keyword research** — Google Keyword Planner (free), or
   **Ahrefs Webmaster Tools** / **Ubersuggest** free tiers. Target long-tail,
   low-competition phrases ("3 days in kyoto first time", not "kyoto").
6. **Rich Results Test** (search.google.com/test/rich-results) — paste a post URL
   to confirm the structured data is valid. Free.
7. **Screaming Frog SEO Spider** — free up to 500 URLs; crawls your site for
   broken links, missing meta, duplicate titles before they hurt you.
8. **Cloudflare** (already your host) — free CDN, caching, and image resizing all
   feed Core Web Vitals, a direct ranking factor.

### The content side (where rankings are actually won)
- Write for **search intent**: answer the exact question a reader typed.
- One clear `<h1>` per page (handled), logical `<h2>/<h3>` structure.
- **Internal linking**: link new posts to older related ones — biggest free win.
- Keep titles ≤ 70 chars and descriptions ≤ 160 (the schema enforces limits).
- Update old posts (`updatedDate`) — freshness is a ranking signal.
- Build **topical authority**: cluster posts around a theme rather than scattering.

---

## Project structure

```
src/
  consts.ts            # ← all site config / monetization keys
  content.config.ts    # post frontmatter schema
  content/blog/*.md    # your posts
  components/           # BaseHead (SEO), Header, Footer, AdSlot, PostCard
  layouts/              # BaseLayout, BlogPost
  pages/                # index, blog, categories, rss, about, privacy, 404
public/                 # robots.txt, favicon, og image, _headers
```
