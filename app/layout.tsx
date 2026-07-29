import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "DeskScape",
  description: "A cozy desktop calendar that brings your workspace to life.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}