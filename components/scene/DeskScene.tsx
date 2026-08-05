"use client";

import Navbar from "@/components/Navbar";

import Calendar from "@/components/calendar/Calendar";

import QuoteFrame from "@/components/dayroom/QuoteFrame";
import Sidebar from "@/components/dayroom/Sidebar";
import Wall from "@/components/dayroom/Walls";

import DeskSurface from "@/components/dayroom/Desksurface";
import Mug from "@/components/desk/Mug";

import Window from "@/components/window/Window";

import SceneObject from "@/components/layout/SceneObject";

import { SCENE } from "@/lib/scene";
import TimeBox from "../dayroom/TimeBox";
import MusicBox from "../music/MusicBox";
import PlantPot from "../dayroom/PlantPot";
import WallTable from "../dayroom/WallTable";
import TempHumidityMeter from "../dayroom/TempHumidityMeter";
import Keynote from "../dayroom/Keynote";
import Camera from "../dayroom/Camera";
import Books from "../dayroom/Books";

interface Props {
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;
}

export default function DeskScene({
  activeMenu,
  setActiveMenu,
}: Props) {
  const {
    design,
    room,
    objects,
  } = SCENE;

  return (
    <>
      {/* ================= Background ================= */}

      <SceneObject
        left={0}
        top={0}
        w={design.width}
        h={design.height}
        layer="wall"
      >
        <Wall />
      </SceneObject>

      <SceneObject
        left={0}
        bottom={0}
        w={design.width}
        h={room.deskHeight}
        layer="desk"
      >
        <DeskSurface />
      </SceneObject>

      {/* ================= World ================= */}

      <SceneObject
        right={objects.window.right}
        top={objects.window.top}
        w={objects.window.w}
        h={objects.window.h}
        layer="window"
      >
        <Window />
      </SceneObject>

      <SceneObject
        right={objects.tempHumidity.right}
        top={objects.tempHumidity.top}
        w={objects.tempHumidity.w}
        h={objects.tempHumidity.h}
        layer="decor"
      >
        <TempHumidityMeter
          temperature={24}
          humidity={68}
        />
      </SceneObject>

      <SceneObject
        left={objects.camera.left}
        top={objects.camera.top}
        w={objects.camera.w}
        h={objects.camera.h}
        layer="wall"
      >
        <Camera />
      </SceneObject>

      <SceneObject
        right={objects.wallTable.right}
        top={objects.wallTable.top}
        w={objects.wallTable.w}
        h={objects.wallTable.h}
        layer="furniture"
      >
        <WallTable />
      </SceneObject>


      <SceneObject
        right={objects.calendar.right}
        bottom={objects.calendar.bottom}
        w={objects.calendar.w}
        h={objects.calendar.h}
        layer="decor"
      >
        <Calendar />
      </SceneObject>

      <SceneObject
        left={objects.timeBox.left}
        bottom={objects.timeBox.bottom}
        w={objects.timeBox.w}
        h={objects.timeBox.h}
        layer="furniture"
    >
        <TimeBox />
    </SceneObject>

    <SceneObject
      left={objects.musicBox.left}
      bottom={objects.musicBox.bottom}
      w={objects.musicBox.w}
      h={objects.musicBox.h}
      layer="decor"
    >
      <MusicBox />
    </SceneObject>

      <SceneObject
        left={objects.mug.left}
        bottom={objects.mug.bottom}
        w={objects.mug.w}
        h={objects.mug.h}
        layer="decor"
      >
        <Mug />
      </SceneObject>

      <SceneObject
        right={objects.plant.right}
        bottom={objects.plant.bottom}
        w={objects.plant.w}
        h={objects.plant.h}
        layer="decor"
      >
        <PlantPot />
      </SceneObject>

      <SceneObject
        right={objects.books.right}
        bottom={objects.books.bottom}
        w={objects.books.w}
        h={objects.books.h}
        layer="furniture"
      >
        <Books />
      </SceneObject>

      <SceneObject
        left={objects.quote.left}
        top={objects.quote.top}
        w={objects.quote.w}
        h={objects.quote.h}
        layer="decor"
      >
        <QuoteFrame />
      </SceneObject>

      <SceneObject
        left={objects.keynote.left}
        top={objects.keynote.top}
        w={objects.keynote.w}
        h={objects.keynote.h}
        layer="decor"
      >
        <Keynote />
      </SceneObject>

      {/* ================= UI ================= */}

      <SceneObject
        left={objects.sidebar.left}
        top={objects.sidebar.top}
        w={objects.sidebar.w}
        h={objects.sidebar.h}
        layer="sidebar"
      >
        <Sidebar
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
      </SceneObject>

      <SceneObject
        left={0}
        top={0}
        w={design.width}
        layer="navbar"
      >
        <Navbar />
      </SceneObject>
    </>
  );
}