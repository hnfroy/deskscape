"use client";

import { useEffect, useRef, useState } from "react";

import DeskScene from "@/components/scene/DeskScene";
import DesktopCanvas from "@/components/DesktopCanvas";
import { asset } from "@/lib/path";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<string | null>("big-days");

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;
    audio.loop = true;
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        // src="/music/Way Home - Tokyowalker.mp3"
        src={asset("/music/Way Home - Tokyowalker.mp3")}
      />

      <DesktopCanvas>
          <DeskScene
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
      </DesktopCanvas>
    </>
  );
}

<script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
        __html: JSON.stringify({
            "@context":"https://schema.org",
            "@type":"WebSite",
            name:"DeskScape",
            url:"https://hnfroy.github.io/deskscape",
            author:{
                "@type":"Person",
                name:"Muhammad Hanif Royyan Ramdhani"
            }
        })
    }}
/>