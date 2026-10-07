import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services, projects, posts } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();
  const staticRoutes = ["", "/services", "/projects", "/about", "/careers", "/insights", "/contact", "/faq"].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    priority: p === "" ? 1 : 0.8,
  }));
  return [
    ...staticRoutes,
    ...services.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: now, priority: 0.7 })),
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}`, lastModified: now, priority: 0.6 })),
    ...posts.map((p) => ({ url: `${base}/insights/${p.slug}`, lastModified: new Date(p.date), priority: 0.5 })),
  ];
}
