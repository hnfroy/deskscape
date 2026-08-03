"use client";

import { asset } from "@/lib/path";
import React from "react";

const PlantPot: React.FC = () => {
  return (
    <div className="plant-wrapper">
      <img
        src={asset("/room/pot-leaf.svg")}
        alt="Plant"
        draggable={false}
        className="h-full w-full object-contain"
      />
    </div>
  );
};

export default PlantPot;