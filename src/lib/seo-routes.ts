/**
 * Auto-synced registry of publicly-crawlable routes. Consumed by the
 * /sitemap.xml handler in src/server/entry.ts.
 *
 * DO NOT add or remove paths by hand. Static paths are mirrored here from
 * src/routes.tsx automatically whenever that file is edited (any manual
 * path edit would be overwritten on the next routes.tsx change). For sync
 * to pick up a route, its `path` must be a literal string starting with "/";
 * template literals and identifier refs are skipped, and dynamic-param routes
 * like "/products/:id" are excluded. The legal pages "/privacy" and "/terms"
 * are never listed here.
 *
 * The only fields safe to hand-edit are the per-entry metadata below, after a
 * sync:
 * - `priority` (0.0–1.0): Home = 1.0, main sections = 0.8, deep pages = 0.5.
 * - `changefreq` and `lastmod`.
 */

import { sectorSlugs } from "./sector-slugs";

export interface SeoRoute {
  path: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
  lastmod?: string;
}

export const seoRoutes: SeoRoute[] = [
  { path: "/", changefreq: "weekly", priority: 1.0, lastmod: "2026-11-23" },
  { path: "/services", changefreq: "monthly", priority: 0.9, lastmod: "2026-11-23" },
  { path: "/services/website-design", changefreq: "monthly", priority: 0.8, lastmod: "2026-11-23" },
  { path: "/services/custom-software", changefreq: "monthly", priority: 0.8, lastmod: "2026-11-23" },
  { path: "/services/workflow-automation", changefreq: "monthly", priority: 0.8, lastmod: "2026-11-23" },
  { path: "/services/ai-assistants", changefreq: "monthly", priority: 0.8, lastmod: "2026-11-23" },
  { path: "/services/booking-and-ordering", changefreq: "monthly", priority: 0.8, lastmod: "2026-11-23" },
  { path: "/services/crm-and-follow-up", changefreq: "monthly", priority: 0.8, lastmod: "2026-11-23" },
  { path: "/services/automated-reviews", changefreq: "monthly", priority: 0.8, lastmod: "2026-11-23" },
  { path: "/services/website-care-plans", changefreq: "monthly", priority: 0.8, lastmod: "2026-11-23" },
  { path: "/services/seo", changefreq: "monthly", priority: 0.8, lastmod: "2026-11-23" },
  { path: "/sectors", changefreq: "monthly", priority: 0.8, lastmod: "2026-11-23" },
  ...sectorSlugs.map((slug): SeoRoute => ({ path: `/sectors/${slug}`, changefreq: "monthly", priority: 0.6, lastmod: "2026-11-23" })),
  { path: "/projects", changefreq: "monthly", priority: 0.8, lastmod: "2026-11-23" },
  { path: "/book", changefreq: "monthly", priority: 0.8, lastmod: "2026-11-23" },
  { path: "/contact", changefreq: "monthly", priority: 0.7, lastmod: "2026-11-23" },
];
