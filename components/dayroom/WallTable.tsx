"use client";

import { asset } from "@/lib/path";

export default function WallTable() {
  return (
    <img
      src={asset("/room/wall-table.svg")}
      alt=""
      draggable={false}
      className="block h-full w-full object-contain"
    />
  );
}