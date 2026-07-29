import { ReactNode } from "react";

interface DesktopCanvasProps {
  children: ReactNode;
}

export default function DesktopCanvas({
  children,
}: DesktopCanvasProps) {
  return (
    <div
      className="
        relative
        w-full
        h-full
        overflow-hidden
        bg-[#F6EAD8]
      "
    >
      {children}
    </div>
  );
}