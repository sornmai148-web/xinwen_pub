import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const hostDomain = process.env.NEXT_PUBLIC_URL || "http://localhost";
  return [
    {
      url: hostDomain,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
