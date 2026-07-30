"use client";

import { ReactNode } from "react";
import useSceneEngine from "@/hooks/useSceneEngine";
import { SCENE } from "@/lib/scene";

interface Props {
  children: ReactNode;
}

export default function RuntimeCanvas({ children }: Props) {
  const engine = useSceneEngine();

  return (
    <div
      className="absolute"
      style={{
        left: engine.offset.x,
        top: engine.offset.y,
        width: SCENE.design.width,
        height: SCENE.design.height,
        transform: `scale(${engine.scale})`,
        transformOrigin: "top left",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}