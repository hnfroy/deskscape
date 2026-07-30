import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://hnfroy.github.io/deskscape",
      lastModified: new Date(),
      priority: 1,
    },
  ];
}