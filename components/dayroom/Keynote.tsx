"use client";

import React, { useRef, useState } from "react";
import { asset } from "@/lib/path";
import {useVisitor} from "@/hooks/useVisitor";

interface KeynoteProps {
  className?: string;
  visitorCount?: number;
}

const Keynote: React.FC<KeynoteProps> = ({
  className = "",
}) => {
  const noteRef = useRef<HTMLDivElement>(null);
  const [isTouched, setIsTouched] = useState(false);
  const visitorCount = useVisitor();

  const handleNoteClick = () => {
    if (isTouched) return;

    const note = noteRef.current;

    if (!note) return;

    setIsTouched(true);

    note.animate(
      [
        {
          transform: "rotate(0deg) translateX(0)",
        },
        {
          transform: "rotate(-1.5deg) translateX(-1px)",
        },
        {
          transform: "rotate(1.5deg) translateX(1px)",
        },
        {
          transform: "rotate(-1deg) translateX(-1px)",
        },
        {
          transform: "rotate(0.6deg) translateX(0.5px)",
        },
        {
          transform: "rotate(0deg) translateX(0)",
        },
      ],
      {
        duration: 420,
        easing: "ease-out",
      }
    );

    window.setTimeout(() => {
      setIsTouched(false);
    }, 420);
  };

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
          KEYNOTE
      ========================= */}

      <div
        className="
          absolute
          inset-0
          rotate-[-5deg]
        "
      >
        {/* =========================
            NOTE GROUP
            SVG + TEXT bergerak bersama
        ========================= */}

        <div
          ref={noteRef}
          className="
            absolute
            inset-0
            z-10
            will-change-transform
          "
        >
          {/* =========================
              NOTE SVG
          ========================= */}

          <img
            src={asset("/wall/note/note.svg")}
            alt=""
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
              VISITOR TEXT
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
                translate-y-[1px]
                flex-col
                items-center
                justify-center
                text-center
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

        {/* =========================
            TAPE
            Tetap diam
        ========================= */}

        <img
          src={asset("/wall/note/tape.svg")}
          alt=""
          draggable={false}
          className="
            pointer-events-none
            absolute
            top-[-15px]
            inset-0
            z-20
            h-[32px]
            w-full
            object-contain
          "
        />

        {/* =========================
            CLICK AREA
        ========================= */}

        <button
          type="button"
          aria-label="Touch visitor note"
          onClick={handleNoteClick}
          className="
            absolute
            inset-[5%]
            z-40
            cursor-pointer
            border-0
            bg-transparent
            p-0
          "
        />
      </div>
    </div>
  );
};

export default Keynote;