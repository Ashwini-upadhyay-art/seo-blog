/**
 * ============================================================
 *  SITE CONFIG — edit everything here, nowhere else.
 * ============================================================
 *  After changing SITE_URL, also update `site` in astro.config.mjs
 *  so the two stay in sync (sitemap + canonical URLs depend on it).
 */

// Your live domain. No trailing slash.
export const SITE_URL = "https://seo-blog.ashwini-upadhy.workers.dev";

export const SITE_TITLE = "Wander & Well";
export const SITE_TAGLINE = "Travel, food & slow-living stories worth the detour";
export const SITE_DESCRIPTION =
  "Honest travel guides, easy recipes and lifestyle ideas to help you live well and explore more — without the fluff.";

// Used for Open Graph locale + <html lang>.
export const SITE_LANG = "en";
export const SITE_LOCALE = "en_US";

// Author / publisher identity (powers JSON-LD structured data).
export const AUTHOR = {
  name: "Aria Lane",
  // A short bio for the about page + Person schema.
  bio: "Writer and full-time traveler sharing the places, plates and small rituals that make life richer.",
  // Absolute or site-relative URL to an author avatar (used in JSON-LD).
  avatar: "/og-default.png",
};

// Social profiles — surfaced in the footer AND in sameAs[] structured data,
// which helps Google build your knowledge graph / entity.
export const SOCIALS = {
  twitter: "https://twitter.com/yourhandle",
  instagram: "https://instagram.com/yourhandle",
  pinterest: "https://pinterest.com/yourhandle",
  youtube: "",
};

// Twitter @handle (without URL) for twitter:site / twitter:creator cards.
export const TWITTER_HANDLE = "@yourhandle";

// Top navigation links.
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog/" },
  { label: "Travel", href: "/categories/travel/" },
  { label: "Food", href: "/categories/food/" },
  { label: "Lifestyle", href: "/categories/lifestyle/" },
  { label: "Health", href: "/categories/health/" },
  { label: "Fitness", href: "/categories/fitness/" },
  { label: "Motivation", href: "/categories/motivation/" },
  { label: "About", href: "/about/" },
];

// Public contact email (shown on about/privacy, used in JSON-LD ContactPoint).
export const CONTACT_EMAIL = "hello@your-blog.com";

/**
 * ============================================================
 *  MONETIZATION
 * ============================================================
 */

// Google AdSense publisher id, e.g. "ca-pub-1234567890123456".
// Leave "" while developing — ad slots render an invisible placeholder
// so they never break your layout or Lighthouse score.
export const ADSENSE_CLIENT = "";

// Default ad slot ids you create in the AdSense dashboard.
export const AD_SLOTS = {
  inArticle: "",
  sidebar: "",
  footer: "",
};

// Google Analytics 4 / Google Tag id, e.g. "G-XXXXXXXXXX". Optional.
export const GA_MEASUREMENT_ID = "";

// Google Search Console verification token (the `content` value from the
// "HTML tag" method). Paste it here, redeploy, then click Verify in GSC.
export const GOOGLE_SITE_VERIFICATION = "wWcRWLwFWBfZm-eNuN197etyqU29iZNBnXLzSxDYn-c";
