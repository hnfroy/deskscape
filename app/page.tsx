"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import DeskScene from "@/components/scene/DeskScene";
import DesktopCanvas from "@/components/DesktopCanvas";
import { asset } from "@/lib/path";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<string | null>("big-days");
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;
    audio.loop = true;
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
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

      {isLoading && (
        <LoadingScreen
          onComplete={handleLoadingComplete}
        />
      )}
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