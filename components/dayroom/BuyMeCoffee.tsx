"use client";

import React from "react";
import { Coffee, ArrowUpRight } from "lucide-react";

interface BuyMeCoffeeProps {
  className?: string;
}

const BuyMeCoffee: React.FC<BuyMeCoffeeProps> = ({
  className = "",
}) => {
  return (
    <a
      href="https://www.buymeacoffee.com/hannnUI"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Buy me a coffee"
      className={`
        group
        relative
        flex
        w-full
        items-center
        justify-between
        overflow-hidden
        rounded-xl
        border-2
        border-black
        bg-[#FCF8ED]
        px-3
        py-2.5
        shadow-[3px_3px_0_#000]
        transition-all
        duration-200
        hover:-translate-y-[2px]
        hover:shadow-[4px_5px_0_#000]
        active:translate-x-[2px]
        active:translate-y-[2px]
        active:shadow-none
        ${className}
      `}
    >
      {/* LEFT */}

      <div className="flex min-w-0 items-center gap-2.5">
        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            border-2
            border-black
            bg-[#F6DFA8]
            transition-transform
            duration-200
            group-hover:-rotate-6
          "
        >
          <Coffee
            size={16}
            strokeWidth={2.5}
          />
        </div>

        <div className="min-w-0">
          <p
            className="
              truncate
              text-[11px]
              font-black
              leading-tight
            "
          >
            Buy me a coffee
          </p>

          <p
            className="
              mt-0.5
              truncate
              text-[9px]
              font-medium
              leading-tight
              text-black/50
            "
          >
            Support the little desk ✦
          </p>
        </div>
      </div>

      {/* ARROW */}

      <div
        className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-md
          border-2
          border-black
          bg-white
          transition-transform
          duration-200
          group-hover:translate-x-0.5
          group-hover:-translate-y-0.5
        "
      >
        <ArrowUpRight
          size={14}
          strokeWidth={2.5}
        />
      </div>
    </a>
  );
};

export default BuyMeCoffee;