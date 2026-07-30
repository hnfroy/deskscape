import { CSSProperties, ReactNode } from "react";
import { SCENE } from "@/lib/scene";

type Layer = keyof typeof SCENE.layers;

interface SceneObjectProps {
  children: ReactNode;

  left?: number;
  right?: number;

  top?: number;
  bottom?: number;

  w?: number;
  h?: number;

  layer?: Layer;

  className?: string;
  style?: CSSProperties;
}

export default function SceneObject({
  children,

  left,
  right,

  top,
  bottom,

  w,
  h,

  layer = "decor",

  className = "",

  style,
}: SceneObjectProps) {
  const computedLeft =
  left !== undefined
    ? left
    : right !== undefined && w !== undefined
    ? SCENE.design.width - right - w
    : undefined;

  const computedTop =
    top !== undefined
      ? top
      : bottom !== undefined && h !== undefined
      ? SCENE.design.height - bottom - h
      : undefined;

  return (
    <div
      className={`absolute ${className}`}
      style={{
        left: computedLeft,
        top: computedTop,
        width: w,
        height: h,
        zIndex: SCENE.layers[layer],
        ...style,
      }}
    >
      {children}
    </div>
  );
}