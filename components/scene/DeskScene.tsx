"use client";

import Navbar from "@/components/Navbar";
import Calendar from "@/components/calendar/Calendar";
import QuoteFrame from "@/components/dayroom/QuoteFrame";
import Sidebar from "@/components/dayroom/Sidebar";
import DeskSurface from "@/components/dayroom/Desksurface";
import Wall from "@/components/dayroom/Walls";
import Mug from "@/components/desk/Mug";
import Window from "@/components/window/Window";

import SceneObject from "../layout/SceneObject";
import { SCENE } from "@/lib/scene";

interface Props {
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;
  isPlaying: boolean;
  onToggleMusic: () => void;
}

export default function DeskScene({
  activeMenu,
  setActiveMenu,
  isPlaying,
  onToggleMusic,
}: Props) {
  const { window, calendar, mug, quote, sidebar } = SCENE.objects;

  return (
    <>
      {/* Wall */}
      <SceneObject
        left={0}
        top={0}
        w={SCENE.width}
        h={SCENE.height}
        layer="wall"
      >
        <Wall />
      </SceneObject>

      {/* Desk */}
      <SceneObject left={0} bottom={0} w={SCENE.width} h={204} layer="desk">
        <DeskSurface />
      </SceneObject>

      {/* Window */}
      <SceneObject
        right={window.right}
        top={window.top}
        w={window.w}
        h={window.h}
        layer="window"
      >
        <Window />
      </SceneObject>

      {/* Calendar */}
      <SceneObject
        right={calendar.right}
        bottom={calendar.bottom}
        w={calendar.w}
        h={calendar.h}
        layer="decor"
      >
        <Calendar />
      </SceneObject>

      {/* Mug */}
      <SceneObject
        left={mug.left}
        bottom={mug.bottom}
        w={mug.w}
        h={mug.h}
        layer="decor"
      >
        <Mug />
      </SceneObject>

      {/* Quote */}
      <SceneObject
        left={quote.left}
        top={quote.top}
        w={quote.w}
        h={quote.h}
        layer="decor"
      >
        <QuoteFrame />
      </SceneObject>

      {/* Sidebar */}
      <SceneObject
        left={sidebar.left}
        top={sidebar.top}
        w={sidebar.w}
        h={sidebar.h}
        layer="sidebar"
      >
        <Sidebar
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          isPlaying={isPlaying}
          onToggleMusic={onToggleMusic}
        />
      </SceneObject>

      {/* Navbar */}
      <SceneObject left={0} top={0} w={SCENE.width} layer="navbar">
        <Navbar />
      </SceneObject>
    </>
  );
}
