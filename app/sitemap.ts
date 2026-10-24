import type { MetadataRoute } from "next"

import { navLinks, siteConfig } from "@/lib/content"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = new Set(["", ...navLinks.map((link) => link.href)])

  return Array.from(routes).map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }))
}
