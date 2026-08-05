"use client";

import { useEffect, useState } from "react";

export default function ExperienceTip() {
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setVisible(true);
    }, 2000);

    return () => {
      clearTimeout(showTimer);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    setCountdown(10);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setVisible(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [visible]);

  return (
    <div
      className={[
        "w-full overflow-hidden",
        "transition-all duration-500 ease-out overflow-hidden rounded-xl border-2-black bg-[#FCF8ED] shadow-[3px_3px_0_#000]",
        visible
          ? "max-h-[220px] translate-y-0 opacity-100"
          : "max-h-0 -translate-y-2 opacity-0",
      ].join(" ")}
    >
      <div
        className="
          relative
          rounded-xl
          border-2
          border-black
          bg-[#FCF8ED]
          p-3
        "
      >
        {/* COUNTDOWN */}
        <div
          className="
            absolute
            right-2
            top-2
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-md
            border-2
            border-black
            bg-white
            text-[10px]
            font-black
            tabular-nums
          "
          aria-label={`Closing in ${countdown} seconds`}
        >
          {countdown}
        </div>

        <div className="pr-7">
          <p className="text-[9px] font-black uppercase tracking-[0.12em] text-black/40">
            Desk Tip
          </p>

          <h3 className="mt-1 text-sm font-black">
            Try the music box
          </h3>

          <p className="mt-1.5 text-[11px] font-medium leading-relaxed text-black/60">
            Turn on the music box and enjoy some
            cozy vibes while exploring the desk.
          </p>
        </div>
      </div>
    </div>
  );
}