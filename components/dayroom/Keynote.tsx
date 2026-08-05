"use client";

import React from "react";
import { asset } from "@/lib/path";

interface KeynoteProps {
  className?: string;
  visitorCount?: number;
}

const Keynote: React.FC<KeynoteProps> = ({
  className = "",
  visitorCount = 1284,
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
          alt="Total visitors"
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
            VISITOR CONTENT
        ========================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            flex
            items-center
            justify-center
          "
        >
          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              text-center
              translate-y-[1px]
            "
          >
            <span
              className="
                text-[8px]
                font-black
                uppercase
                leading-none
                tracking-[0.08em]
                text-black
              "
            >
              Total Visitors
            </span>

            <span
              className="
                mt-[5px]
                font-mono
                text-[20px]
                font-bold
                leading-none
                tracking-[-0.06em]
                text-black
              "
            >
              {visitorCount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Keynote;