"use client";

import { asset } from "@/lib/path";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({
  onComplete,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const duration = 3200;
    const start = performance.now();

    let frame: number;
    let completeTimer: ReturnType<typeof setTimeout>;
    let finishTimer: ReturnType<typeof setTimeout>;

    const animate = (time: number) => {
      const elapsed = time - start;

      const value = Math.min(
        (elapsed / duration) * 100,
        100
      );

      setProgress(value);

      if (value < 100) {
        frame = requestAnimationFrame(animate);
      } else {
        completeTimer = setTimeout(() => {
          setClosing(true);

          finishTimer = setTimeout(() => {
            onComplete();
          }, 700);
        }, 150);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(completeTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        overflow-hidden
      "
    >
      {/* =========================
          BACKGROUND / GLASS LAYER
      ========================= */}

      <div
        className={`
          absolute
          inset-0
          bg-[#f6ead8]/95
          backdrop-blur-[18px]

          transition-[backdrop-filter,filter]
          duration-700
          ease-out

          ${
            closing
              ? "blur-[10px] backdrop-blur-0"
              : "blur-0 backdrop-blur-[18px]"
          }
        `}
      />

      {/* =========================
          CENTER CONTENT
      ========================= */}

      <div
        className={`
          absolute
          inset-0
          flex
          items-center
          justify-center

          transition-opacity
          duration-700
          ease-out

          ${
            closing
              ? "pointer-events-none opacity-0"
              : "opacity-100"
          }
        `}
      >
        <div
          className="
            relative
            flex
            w-[280px]
            flex-col
            items-center
            text-center
          "
        >
          {/* =========================
              LOGO
          ========================= */}

          <div
            className="
              mb-6
              flex
              h-[92px]
              w-[92px]
              items-center
              justify-center
              overflow-hidden
              rounded-[22px]
              border-2
              border-black
              bg-[#f6ead8]
              shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]
            "
          >
            <img
              src={asset("/logo/deskscape-logo.png")}
              alt="DESKSCAPE"
              className="
                h-full
                w-full
                object-contain
              "
              draggable={false}
            />
          </div>

          {/* =========================
              TITLE
          ========================= */}

          <h1
            className="
              text-[24px]
              font-black
              tracking-[-0.04em]
              text-black
            "
          >
            Welcome to DESKSCAPE
          </h1>

          {/* =========================
              SUBTITLE
          ========================= */}

          <p
            className="
              mt-1
              text-[12px]
              font-medium
              text-black/50
            "
          >
            by Hnfroy
          </p>

          {/* =========================
              LOADING BAR
          ========================= */}

          <div
            className="
              mt-8
              w-full
            "
          >
            <div
              className="
                h-[12px]
                w-full
                overflow-hidden
                rounded-full
                border-2
                border-black
                bg-white/60
              "
            >
              <div
                className="
                  h-full
                  rounded-full
                  bg-[#cdb8ee]
                  transition-[width]
                  duration-75
                  ease-linear
                "
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            {/* =========================
                LOADING TEXT
            ========================= */}

            <div
              className="
                mt-2
                flex
                items-center
                justify-between
                text-[10px]
                font-bold
                uppercase
                tracking-[0.08em]
                text-black/50
              "
            >
              <span>
                Setting up your desk...
              </span>

              <span>
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}