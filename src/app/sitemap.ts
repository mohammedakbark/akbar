import type { MetadataRoute } from "next";
import { profile } from "@/data/content";
import { siteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}${profile.resume}`, lastModified, changeFrequency: "yearly", priority: 0.5 },
  ];
}
