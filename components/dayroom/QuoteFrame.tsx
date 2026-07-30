"use client";

import { asset } from "@/lib/path";
import Image from "next/image";

export default function QuoteFrame() {
  return (
    <div className="relative w-[200px] h-[250px]">

      {/* Frame */}
      <Image
        src={asset("/wall/frames.svg")}
        alt="Quote Frame"
        fill
        priority
      />

      {/* Viewport */}
      <div
        className="
          absolute
          left-[4px]
          top-[15px]
          w-[198px]
          h-[208px]
          flex
          items-center
          justify-center
          px-5
          text-center
        "
      >
        <h1
          className="
            text-xl
            font-black
            leading-tight
            tracking-tight
            text-[#2F2333]
            break-words
            select-none
          "
        >
          FOCUS
          <br />
          AND
          <br />
          ENJOY
          <br />
          :)
        </h1>
      </div>

    </div>
  );
}