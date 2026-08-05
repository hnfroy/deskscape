"use client";

import React from "react";
import { asset } from "@/lib/path";

interface BooksProps {
  className?: string;
}

const Books: React.FC<BooksProps> = ({
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
        src={asset("/room/books.svg")}
        alt="Books"
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

export default Books;