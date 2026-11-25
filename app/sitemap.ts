import type { MetadataRoute } from "next";
import { SERVICE_PAGES } from "@/lib/services";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly") => ({ url: `${SITE.url}${path}`, lastModified: now, changeFrequency, priority });
  return [
    page("/", 1, "weekly"),
    ...SERVICE_PAGES.map((s) => page(`/services/${s.slug}`, 0.9, "monthly")),
    page("/contact", 0.8, "monthly"),
    page("/privacy-policy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
