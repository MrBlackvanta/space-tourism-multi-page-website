import { navLinks, SITE_URL } from "@/data";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return navLinks.map(({ href }) => ({
    url: href === "/" ? SITE_URL : `${SITE_URL}${href}`,
    changeFrequency: "monthly",
    priority: href === "/" ? 1 : 0.8,
  }));
}
