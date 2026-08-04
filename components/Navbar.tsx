"use client";

import React from "react";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  className = "",
}) => {
  return (
    <header
      className={`
        flex
        items-center
        p-7
        z-50
        ${className}
      `}
    >
      <h1 className="text-2xl font-black text-black">
        DESKSCAPE
      </h1>
    </header>
  );
};

export default Navbar;