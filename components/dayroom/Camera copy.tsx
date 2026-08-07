"use client";

import React from "react";
import { asset } from "@/lib/path";

interface CameraProps {
  className?: string;
}

const Camera: React.FC<CameraProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`
        relative
        h-full
        w-full
        select-none
        ${className}
      `}
    >
      <img
        src={asset("/wall/camera.svg")}
        alt="Camera"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-contain
        "
        draggable={false}
      />
    </div>
  );
};

export default Camera;