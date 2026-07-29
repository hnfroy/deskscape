"use client";

import { ReactNode, useEffect, useState } from "react";
import { SCENE } from "@/lib/scene";
const BASE_WIDTH = 1440;
const BASE_HEIGHT = 900;

interface Props {
  children: ReactNode;
}

export default function DesktopCanvas({
  children,
}: Props) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const resize = () => {
      const scaleX = window.innerWidth / BASE_WIDTH;
      const scaleY = window.innerHeight / BASE_HEIGHT;

      setScale(Math.min(scaleX, scaleY));
    };

    resize();

    window.addEventListener("resize", resize);

    return () =>
      window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">

      <div
        className="absolute left-1/2 top-1/2 origin-center"
        style={{
          width: BASE_WIDTH,
          height: BASE_HEIGHT,
          transform: `translate(-50%, -50%) scale(${scale})`,
          background: "#F6EAD8",
          overflow: "hidden",
        }}
      >
        {children}
      </div>

    </div>
  );
}