"use client";

import { useMemo } from "react";
import useViewport from "./useViewport";
import { SCENE } from "@/lib/scene";

export default function useSceneEngine() {
  const viewport = useViewport();

  const scale = useMemo(() => {
    if (!viewport.width || !viewport.height) return 1;

    return Math.min(
      viewport.width / SCENE.design.width,
      viewport.height / SCENE.design.height
    );
  }, [viewport]);

  const runtimeWidth = SCENE.design.width * scale;
  const runtimeHeight = SCENE.design.height * scale;

  const offsetX = (viewport.width - runtimeWidth) / 2;
  const offsetY = (viewport.height - runtimeHeight) / 2;

  return {
    viewport,

    design: SCENE.design,

    runtime: {
      width: runtimeWidth,
      height: runtimeHeight,
    },

    scale,

    offset: {
      x: offsetX,
      y: offsetY,
    },
  };
}