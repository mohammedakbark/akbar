import type { MetadataRoute } from "next";
import { profile } from "@/data/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} · Portfolio`,
    short_name: profile.shortName,
    description: profile.role,
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
