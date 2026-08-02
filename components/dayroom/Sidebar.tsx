"use client";

import React, { useMemo, useState } from "react";
import {
  FileText,
  ListTodo,
  CalendarDays,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
} from "lucide-react";

interface SidebarProps {
  className?: string;
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;
}

/* =========================================================
   TYPES
========================================================= */

interface BigDay {
  date: string;
  month: number;
  title: string;
}

interface MonthGroup {
  month: number;
  monthName: string;
  events: BigDay[];
}

/* =========================================================
   BIG DAYS DATA
   2026
========================================================= */

const BIG_DAYS: BigDay[] = [
  {
    date: "1",
    month: 1,
    title: "Tahun Baru Masehi",
  },
  {
    date: "16",
    month: 1,
    title: "Isra Mikraj Nabi Muhammad SAW",
  },

  {
    date: "17",
    month: 2,
    title: "Tahun Baru Imlek",
  },

  {
    date: "19",
    month: 3,
    title: "Hari Suci Nyepi",
  },

  {
    date: "3",
    month: 4,
    title: "Wafat Yesus Kristus",
  },
  {
    date: "5",
    month: 4,
    title: "Paskah",
  },

  {
    date: "1",
    month: 5,
    title: "Hari Buruh Internasional",
  },
  {
    date: "14",
    month: 5,
    title: "Kenaikan Yesus Kristus",
  },
  {
    date: "27",
    month: 5,
    title: "Idul Adha",
  },

  {
    date: "1",
    month: 6,
    title: "Hari Lahir Pancasila",
  },
  {
    date: "16",
    month: 6,
    title: "1 Muharam / Tahun Baru Islam",
  },

  {
    date: "17",
    month: 8,
    title: "Hari Kemerdekaan Republik Indonesia",
  },

  {
    date: "25",
    month: 12,
    title: "Hari Natal",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getMonthName = (month: number) => {
  return MONTH_NAMES[month - 1] ?? "";
};

/* =========================================================
   COMPONENT
========================================================= */

const Sidebar: React.FC<SidebarProps> = ({
  className = "",
  activeMenu,
  setActiveMenu,
}) => {
  const [bigDaysView, setBigDaysView] = useState<
    "current" | "months" | "month-detail"
  >("current");

  const [selectedMonth, setSelectedMonth] =
    useState<number | null>(null);

  /* =========================================================
     CURRENT MONTH
  ========================================================= */

  const currentMonth = new Date().getMonth() + 1;

  const currentMonthEvents = useMemo(() => {
    return BIG_DAYS.filter(
      (item) => item.month === currentMonth
    );
  }, [currentMonth]);

  /* =========================================================
     GROUP MONTHS
  ========================================================= */

  const monthGroups = useMemo<MonthGroup[]>(() => {
    const groups = new Map<number, BigDay[]>();

    BIG_DAYS.forEach((item) => {
      const existing = groups.get(item.month);

      if (existing) {
        existing.push(item);
      } else {
        groups.set(item.month, [item]);
      }
    });

    return Array.from(groups.entries())
      .sort(([monthA], [monthB]) => monthA - monthB)
      .map(([month, events]) => ({
        month,
        monthName: getMonthName(month),
        events,
      }));
  }, []);

  /* =========================================================
     SELECTED MONTH
  ========================================================= */

  const selectedMonthGroup = useMemo(() => {
    if (!selectedMonth) {
      return null;
    }

    return (
      monthGroups.find(
        (group) => group.month === selectedMonth
      ) ?? null
    );
  }, [monthGroups, selectedMonth]);

  /* =========================================================
     MENU
  ========================================================= */

  const handleMenuClick = (menu: string) => {
    setBigDaysView("current");
    setSelectedMonth(null);

    setActiveMenu(
      activeMenu === menu ? null : menu
    );
  };

  const handleBigDaysClick = () => {
    if (activeMenu === "big-days") {
      setActiveMenu(null);
      setBigDaysView("current");
      setSelectedMonth(null);
      return;
    }

    setActiveMenu("big-days");
    setBigDaysView("current");
    setSelectedMonth(null);
  };

  /* =========================================================
     VIEW ALL
  ========================================================= */

  const handleViewAll = () => {
    setBigDaysView("months");
  };

  /* =========================================================
     MONTH
  ========================================================= */

  const handleMonthClick = (month: number) => {
    setSelectedMonth(month);
    setBigDaysView("month-detail");
  };

  /* =========================================================
     BACK
  ========================================================= */

  const handleBack = () => {
    if (bigDaysView === "month-detail") {
      setSelectedMonth(null);
      setBigDaysView("months");
      return;
    }

    if (bigDaysView === "months") {
      setBigDaysView("current");
    }
  };

  /* =========================================================
     NORMAL MENU ITEMS
  ========================================================= */

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
      className={`
        w-64
        flex
        flex-col
        gap-3
        ${className}
      `}
    >
      {/* =====================================================
          EVENTS + NOTES
      ===================================================== */}

      {menuItems.map((item) => {
        const Icon = item.icon;
        const active = activeMenu === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() =>
              handleMenuClick(item.id)
            }
            className={`
              flex
              items-center
              gap-3
              w-full
              rounded-xl
              border-2
              border-black
              px-3
              py-3
              bg-[#FCF8ED]
              shadow-[3px_3px_0_#000]
              transition-all
              duration-150
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
            <Icon
              size={22}
              strokeWidth={2}
            />

            <span className="font-bold">
              {item.label}
            </span>
          </button>
        );
      })}

      {/* =====================================================
          BIG DAYS CONTAINER
      ===================================================== */}

      <div
        className={`
          w-full
          overflow-hidden
          rounded-xl
          border-2
          border-black
          bg-[#FCF8ED]
          shadow-[3px_3px_0_#000]
          transition-all
          duration-300
          ease-[cubic-bezier(.16,1,.3,1)]
          ${
            activeMenu === "big-days"
              ? "shadow-[2px_2px_0_#000]"
              : ""
          }
        `}
      >
        {/* ===================================================
            BIG DAYS BUTTON
        =================================================== */}

        <button
          type="button"
          onClick={handleBigDaysClick}
          className={`
            flex
            items-center
            justify-between
            w-full
            min-h-[60px]
            px-3
            py-3
            cursor-pointer
            transition-colors
            duration-200
            ${
              activeMenu === "big-days"
                ? "bg-[#d0bdf4]"
                : "hover:bg-[#F7F1E3]"
            }
          `}
        >
          <div className="flex items-center gap-3">
            <CalendarDays
              size={22}
              strokeWidth={2}
            />

            <span className="font-bold">
              Big Days
            </span>
          </div>

          <ChevronRight
            size={18}
            className={`
              transition-transform
              duration-300
              ${
                activeMenu === "big-days"
                  ? "rotate-90"
                  : ""
              }
            `}
          />
        </button>

        {/* ===================================================
            GENIE CONTENT
        =================================================== */}

        <div
          className={`
            grid
            transition-[grid-template-rows,opacity]
            duration-400
            ease-[cubic-bezier(.16,1,.3,1)]
            ${
              activeMenu === "big-days"
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }
          `}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              className={`
                px-3
                pb-3
                transform
                transition-all
                duration-400
                ease-[cubic-bezier(.16,1,.3,1)]
                ${
                  activeMenu === "big-days"
                    ? "translate-y-0 scale-100"
                    : "-translate-y-3 scale-[0.96]"
                }
              `}
            >
              {/* =================================================
                  CURRENT MONTH
              ================================================= */}

              {bigDaysView === "current" && (
                <div className="pt-1">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500">
                        This month
                      </p>

                      <h3 className="text-lg font-black leading-tight">
                        {getMonthName(
                          currentMonth
                        )}
                      </h3>
                    </div>

                    <div className="rounded-lg border-2 border-black bg-white px-2 py-1 text-xs font-bold shadow-[2px_2px_0_#000]">
                      {currentMonthEvents.length}
                    </div>
                  </div>

                  {currentMonthEvents.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {currentMonthEvents.map(
                        (event) => (
                          <div
                            key={`${event.month}-${event.date}-${event.title}`}
                            className="
                              flex
                              items-center
                              gap-2
                              rounded-lg
                              border-2
                              border-black
                              bg-white
                              px-2
                              py-2
                            "
                          >
                            <div
                              className="
                                flex
                                h-8
                                w-8
                                shrink-0
                                items-center
                                justify-center
                                rounded-md
                                bg-[#d0bdf4]
                                text-xs
                                font-black
                              "
                            >
                              {event.date}
                            </div>

                            <p className="min-w-0 text-xs font-bold leading-tight">
                              {event.title}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div
                      className="
                        rounded-lg
                        border-2
                        border-dashed
                        border-black/30
                        px-3
                        py-4
                        text-center
                      "
                    >
                      <p className="text-xs font-semibold text-gray-500">
                        No big days this month
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleViewAll}
                    className="
                      mt-3
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-1
                      rounded-lg
                      border-2
                      border-black
                      bg-black
                      px-3
                      py-2
                      text-xs
                      font-bold
                      text-white
                      transition-all
                      hover:translate-y-[-1px]
                      active:translate-y-[2px]
                    "
                  >
                    View all big days
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}

              {/* =================================================
                  ALL MONTHS
              ================================================= */}

              {bigDaysView === "months" && (
                <div className="pt-1">
                  <div className="mb-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleBack}
                      aria-label="Back"
                      className="
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-md
                        border-2
                        border-black
                        bg-white
                        transition-transform
                        hover:-translate-x-0.5
                        active:translate-y-[1px]
                      "
                    >
                      <ArrowLeft size={14} />
                    </button>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500">
                        Indonesia
                      </p>

                      <h3 className="text-lg font-black leading-tight">
                        Big Days
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {monthGroups.map(
                      (group) => (
                        <button
                          key={group.month}
                          type="button"
                          onClick={() =>
                            handleMonthClick(
                              group.month
                            )
                          }
                          className="
                            flex
                            w-full
                            items-center
                            justify-between
                            rounded-lg
                            border-2
                            border-black
                            bg-white
                            px-3
                            py-2.5
                            text-left
                            transition-all
                            hover:translate-x-[2px]
                            hover:bg-[#F7F1E3]
                            active:translate-x-[3px]
                            active:translate-y-[2px]
                          "
                        >
                          <span className="font-bold">
                            {group.monthName}
                          </span>

                          <span className="flex items-center gap-1">
                            <span className="rounded-md bg-[#d0bdf4] px-1.5 py-0.5 text-[10px] font-black">
                              {group.events.length}
                            </span>

                            <ChevronRight
                              size={15}
                            />
                          </span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* =================================================
                  MONTH DETAIL
              ================================================= */}

              {bigDaysView ===
                "month-detail" &&
                selectedMonthGroup && (
                  <div className="pt-1">
                    <div className="mb-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleBack}
                        aria-label="Back to months"
                        className="
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-md
                          border-2
                          border-black
                          bg-white
                          transition-transform
                          hover:-translate-x-0.5
                          active:translate-y-[1px]
                        "
                      >
                        <ChevronLeft
                          size={15}
                        />
                      </button>

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500">
                          2026
                        </p>

                        <h3 className="text-lg font-black leading-tight">
                          {
                            selectedMonthGroup.monthName
                          }
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {selectedMonthGroup.events.map(
                        (event) => (
                          <div
                            key={`${event.month}-${event.date}-${event.title}`}
                            className="
                              flex
                              gap-3
                              rounded-lg
                              border-2
                              border-black
                              bg-white
                              p-2
                            "
                          >
                            <div
                              className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                flex-col
                                items-center
                                justify-center
                                rounded-md
                                bg-[#d0bdf4]
                                leading-none
                              "
                            >
                              <span className="text-[9px] font-bold uppercase">
                                {getMonthName(
                                  event.month
                                ).slice(0, 3)}
                              </span>

                              <span className="text-sm font-black">
                                {event.date}
                              </span>
                            </div>

                            <div className="flex min-w-0 items-center">
                              <p className="text-xs font-bold leading-tight">
                                {event.title}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
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