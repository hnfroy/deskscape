import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DeskScape",
    short_name: "DeskScape",

    description:
      "Interactive virtual desktop experience.",

    start_url: "/deskscape",

    display: "standalone",

    background_color: "#d9d9d9",

    theme_color: "#d9d9d9",

    icons: [
      {
        src: "/deskscape/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}