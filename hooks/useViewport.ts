"use client";

import { useEffect, useState } from "react";

export interface Viewport {
  width: number;
  height: number;
}

export default function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();

    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  return viewport;
}