import type { Metadata } from "next";

import "./globals.css";
import { useEffect } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://hnfroy.github.io"),

  title: {
    default: "DeskScape - An interactive desktop experience",
    template: "%s | DeskScape",
  },

  description:
    "DeskScape is an interactive virtual desktop inspired by cozy workspaces, combining productivity, aesthetics, and playful web experiences built with React, Next.js, and TypeScript.",

  keywords: [
    "DeskScape",
    "Virtual Desktop",
    "Interactive Desktop",
    "Cozy Workspace",
    "Portfolio",
    "Next.js",
    "React",
    "TypeScript",
    "UI Design",
    "Frontend",
    "Interactive Website",
    "Web Animation",
  ],

  authors: [
    {
      name: "Muhammad Hanif Royyan Ramdhani",
    },
  ],

  creator: "Muhammad Hanif Royyan Ramdhani",

  publisher: "HNFROY",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/deskscape",
  },

  openGraph: {
    title: "DeskScape",
    description:
      "An interactive desktop experience inspired by cozy workspaces and productivity.",

    url: "https://hnfroy.github.io/deskscape",

    siteName: "DeskScape",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/deskscape/og-cover.png",
        width: 1200,
        height: 630,
        alt: "DeskScape",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "DeskScape",

    description:
      "Interactive cozy desktop built using Next.js and React.",

    images: ["/deskscape/og-cover.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener(
      "contextmenu",
      handleContextMenu
    );

    return () => {
      document.removeEventListener(
        "contextmenu",
        handleContextMenu
      );
    };
  }, []);
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}