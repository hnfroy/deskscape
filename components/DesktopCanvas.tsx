"use client";

import { ReactNode } from "react";
import RuntimeCanvas from "./layout/RuntimeCanvas";

interface Props {
  children: ReactNode;
}

export default function DesktopCanvas({
  children,
}: Props) {
  return (
    <div className="fixed inset-0 overflow-hidden bg-[#BFBFBF]">
      <RuntimeCanvas>
        {children}
      </RuntimeCanvas>
    </div>
  );
}