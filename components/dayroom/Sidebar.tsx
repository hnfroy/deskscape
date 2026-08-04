"use client";

import React from "react";
import {
  FileText,
  ListTodo,
} from "lucide-react";

import BigDays from "./BigDays";
import ExperienceTip from "./ExperienceTip";

interface SidebarProps {
  className?: string;
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  className = "",
  activeMenu,
  setActiveMenu,
}) => {
  const menuItems = [
    {
      id: "events",
      label: "Events",
      icon: ListTodo,
    },
    {
      id: "notes",
      label: "Notes",
      icon: FileText,
    },
  ];

  const handleMenuClick = (menu: string) => {
    setActiveMenu(
      activeMenu === menu ? null : menu
    );
  };

  return (
    <aside
      className={`
        flex
        w-64
        flex-col
        gap-3
        ${className}
      `}
    >
      {/* BIG DAYS */}

      <BigDays
        active={activeMenu === "big-days"}
        onToggle={() => {
          setActiveMenu(
            activeMenu === "big-days"
              ? null
              : "big-days"
          );
        }}
      />

      {/* DESK TIP */}

      <ExperienceTip />
    </aside>
  );
};

export default Sidebar;