"use client";

import React from "react";
import {
  FileText,
  ListTodo,
  Music4,
  Pause,
  Play,
} from "lucide-react";

interface SidebarProps {
  className?: string;
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;

  isPlaying: boolean;
  onToggleMusic: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  className = "",
  activeMenu,
  setActiveMenu,
  isPlaying,
  onToggleMusic,
}) => {
  const musicActive = activeMenu === "music" || isPlaying;
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
      className={`w-64 flex flex-col gap-3 p-6 ${className}`}
    >
      {/* Events & Notes */}
      {menuItems.map((item) => {
        const Icon = item.icon;
        const active = activeMenu === item.id;

        return (
          <button
            key={item.id}
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

      {/* MUSIC */}
      <div
        className={`
          overflow-hidden
          rounded-xl
          border-2
          border-black
          shadow-[3px_3px_0_#000]
          transition-[background-color,max-height,transform,box-shadow]
          duration-700
          ease-[cubic-bezier(.16,1,.3,1)]
          origin-top
          will-change-transform
          ${
            musicActive
              ? "bg-[#d0bdf4]"
              : "bg-[#FCF8ED]"
          }
          ${
            activeMenu === "music"
              ? "max-h-[170px] scale-y-100"
              : "max-h-[60px] scale-y-[0.98]"
          }
        `}
      >
        {/* Header */}
        <div
          onClick={() =>
            setActiveMenu(activeMenu === "music" ? null : "music")
          }
          className="
            flex
            h-[60px]
            cursor-pointer
            items-center
            justify-between
            px-3
            select-none
          "
        >
          <div className="flex items-center gap-3 min-w-0">

            <Music4 size={22} className="shrink-0" />

            <span className="font-bold whitespace-nowrap">
              Music
            </span>
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              onToggleMusic();
            }}
            className="
              flex
              h-9
              w-9
              shrink-0
              cursor-pointer
              items-center
              justify-center
              rounded-lg
              bg-[#f6ae5c]
              border-2
              transition-all
              duration-150
              hover:scale-105
              active:scale-95
            "
          >
            {isPlaying ? (
              <Pause size={16} />
            ) : (
              <Play
                size={16}
                className="translate-x-[1px]"
              />
            )}
          </div>
        </div>

        {/* Expand */}
        <div
          className={`
            px-3 pb-3
            transition-all
            duration-300
            ${
              activeMenu === "music"
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            }
          `}
        >
          <div className="flex items-center justify-between">
            <div>

              <h3 className="mt-1 font-bold leading-tight">
                Way Home
              </h3>

              <p className="text-sm text-gray-500">
                TokyoWalker
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              {isPlaying && (
                <div className="equalizer shrink-0">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;