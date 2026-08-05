"use client";

import React, { useState } from "react";
import { asset } from "@/lib/path";

interface BooksProps {
  className?: string;
}

type BookId = "book1" | "book2" | "book3";

const Books: React.FC<BooksProps> = ({
  className = "",
}) => {
  const [hoveredBook, setHoveredBook] =
    useState<BookId | null>(null);

  const getBookClass = (book: BookId) => {
    const isHovered = hoveredBook === book;

    return `
      absolute
      inset-0
      h-full
      w-full
      object-contain
      pointer-events-none
      transform-gpu
      will-change-transform
      transition-transform
      duration-200
      ease-out
      ${
        isHovered
          ? "-translate-y-[5px]"
          : "translate-y-0"
      }
    `;
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
          BACK
      ========================= */}

      <img
        src={asset("/room/book/bookplace-back.svg")}
        alt=""
        draggable={false}
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          h-full
          w-full
          object-contain
        "
      />

      {/* =========================
          BOOK 1
      ========================= */}

      <div
        className="
          absolute
          right-[-40px]
          inset-0
          z-37
        "
        onMouseEnter={() => setHoveredBook("book1")}
        onMouseLeave={() => setHoveredBook(null)}
      >
        <img
          src={asset("/room/book/book-1.svg")}
          alt="Book"
          draggable={false}
          className={getBookClass("book1")}
        />
      </div>

      {/* =========================
          BOOK 2
      ========================= */}

      <div
        className="
          absolute
          right-[30px]
          inset-0
          z-38
        "
        onMouseEnter={() => setHoveredBook("book2")}
        onMouseLeave={() => setHoveredBook(null)}
      >
        <img
          src={asset("/room/book/book-2.svg")}
          alt="Book"
          draggable={false}
          className={getBookClass("book2")}
        />
      </div>

      {/* =========================
          BOOK 3
      ========================= */}

      <div
        className="
          absolute
          right-[80px]
          bottom-0
          inset-0
          z-39
        "
        onMouseEnter={() => setHoveredBook("book3")}
        onMouseLeave={() => setHoveredBook(null)}
      >
        <img
          src={asset("/room/book/book-3.svg")}
          alt="Book"
          draggable={false}
          className={getBookClass("book3")}
        />
      </div>

      {/* =========================
          FRONT
      ========================= */}

      <img
        src={asset("/room/book/bookplace-front.svg")}
        alt=""
        draggable={false}
        className="
          pointer-events-none
          absolute
          top-[40px]
          inset-0
          z-40
          h-full
          w-full
          object-contain
        "
      />
    </div>
  );
};

export default Books;