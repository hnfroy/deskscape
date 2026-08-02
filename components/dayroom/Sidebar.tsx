"use client";

import React from "react";
import {
  FileText,
  ListTodo,
} from "lucide-react";

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

  return (
    <aside
      className={`w-64 flex flex-col gap-3 ${className}`}
    >
      {menuItems.map((item) => {
        const Icon = item.icon;
        const active = activeMenu === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() =>
              setActiveMenu(active ? null : item.id)
            }
            className={`
              flex items-center gap-3
              rounded-xl
              border-2 border-black
              px-3 py-3
              bg-[#FCF8ED]
              shadow-[3px_3px_0_#000]
              transition-all
              active:translate-x-[3px]
              active:translate-y-[3px]
              active:shadow-none
              ${
                active
                  ? "bg-[#d0bdf4]"
                  : "hover:bg-[#F7F1E3]"
              }
            `}
          >
            <Icon size={22} />

            <span className="font-bold">
              {item.label}
            </span>
          </button>
        );
      })}
    </aside>
  );
};

export default Sidebar;