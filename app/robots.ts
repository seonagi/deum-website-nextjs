import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/api", "/settings", "/history"],
    },
    sitemap: "https://deum.video/sitemap.xml",
  };
}
