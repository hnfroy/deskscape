"use client";

import { useEffect, useRef, useState } from "react";

import DesktopCanvas from "@/components/DesktopCanvas";

import Sidebar from "@/components/dayroom/Sidebar";
import Window from "@/components/window/Window";
import Wall from "@/components/dayroom/Walls";
import DeskSurface from "@/components/dayroom/Desksurface";
import Navbar from "@/components/Navbar";
import Calendar from "@/components/calendar/Calendar";
import Mug from "@/components/desk/Mug";
import QuoteFrame from "@/components/dayroom/QuoteFrame";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;
    audio.loop = true;

    audio.play().catch(() => {
      setIsPlaying(false);
    });
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[#BFBFBF]">

      {/* Audio */}
      <audio
        ref={audioRef}
        src="/music/Way Home - Tokyowalker.mp3"
      />

      <DesktopCanvas>

        {/* Wall */}
        <div className="absolute inset-x-0 bottom-0 z-10 w-full">
          <Wall />
        </div>

        <div className="absolute left-[420px] top-[50px] z-[99]">
          <QuoteFrame />
        </div>

        {/* Desk */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-11 h-64 w-full">
          <DeskSurface />
        </div>

        {/* Window */}
        <div className="absolute right-[90px] top-[10px] h-[480px] w-[550px] z-20">
          <Window />
        </div>

        {/* Calendar */}
        <div className="absolute right-[400px] bottom-[50px] z-[99] w-[420px]">
          <Calendar />
        </div>

        {/* Mug */}
        <div className="absolute left-[220px] bottom-[50px] z-[99] w-[200px]">
          <Mug />
        </div>

        {/* Navbar */}
        <div className="relative z-20">
          <Navbar />
        </div>
        
        {/* Sidebar */}
        <div className="relative z-20">
          <Sidebar
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            isPlaying={isPlaying}
            onToggleMusic={toggleMusic}
          />
        </div>
      </DesktopCanvas>
    </div>
  );
}