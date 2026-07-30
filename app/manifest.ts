import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DeskScape",
    short_name: "DeskScape",
    description:
      "Interactive portfolio by Hanif Royyan. Experience a cozy animated desktop workspace built with Next.js.",

    start_url: "/deskscape/",
    display: "standalone",
    background_color: "#F4E7DA",
    theme_color: "#F4E7DA",

    icons: [
      {
        src: "/deskscape/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/deskscape/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}