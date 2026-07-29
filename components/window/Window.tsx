"use client";

import { getCurrentScene } from "@/lib/time";

import DayScene from "./scenes/DayScene";
import SunsetScene from "./scenes/SunsetScene";
// import NightScene from "./scenes/NightScene";

export default function Window() {
  const scene = getCurrentScene();

  return (
    <div className="relative w-full h-full">
      {scene === "day" && <DayScene />}
      {scene === "sunset" && <SunsetScene />}
      {/* {scene === "night" && <NightScene />} */}
    </div>
  );
}