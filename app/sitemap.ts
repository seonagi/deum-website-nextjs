import { MetadataRoute } from "next";
import { readdirSync, statSync } from "fs";
import { join } from "path";

const BASE_URL = "https://deum.video";

function getBlogSlugs(): string[] {
  const blogDir = join(process.cwd(), "app", "blog");
  try {
    return readdirSync(blogDir).filter((entry) => {
      const fullPath = join(blogDir, entry);
      return (
        statSync(fullPath).isDirectory() &&
        entry !== "." &&
        !entry.startsWith("_")
      );
    });
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/about", "/blog", "/faq"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : 0.8,
  }));

  const blogPages = getBlogSlugs().map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
