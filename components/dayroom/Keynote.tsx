"use client";

import React from "react";
import { asset } from "@/lib/path";

interface KeynoteProps {
  className?: string;
}

const Keynote: React.FC<KeynoteProps> = ({
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
      {/* =========================
          KEYNOTE GROUP
      ========================= */}

      <div
        className="
          absolute
          inset-0
          rotate-[-5deg]
        "
      >
        {/* =========================
            KEYNOTE SVG
        ========================= */}

        <img
          src={asset("/room/keynote.svg")}
          alt="Keynote"
          draggable={false}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-contain
          "
        />

        {/* =========================
            TEXT
        ========================= */}

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            pointer-events-none
          "
        >
          <span
            className="
              translate-y-[1px]
              whitespace-nowrap
              text-center
              text-[12px]
              font-bold
              leading-none
              tracking-[-0.02em]
              text-black
            "
          >
            Buy me a coffee <br /><br /> ☕
          </span>
        </div>
      </div>
    </div>
  );
};

export default Keynote;