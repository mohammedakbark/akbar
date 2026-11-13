/**
 * Public address of the site, used for canonical URLs, the sitemap and social previews.
 * Vercel fills this in automatically; set NEXT_PUBLIC_SITE_URL to use a custom domain.
 * (Kept out of content.ts because that file exports its own `process`.)
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
