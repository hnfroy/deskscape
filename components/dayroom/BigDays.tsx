"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
    ArrowLeft,
    CalendarDays,
    ChevronRight,
} from "lucide-react";

interface BigDaysProps {
    active: boolean;
    onToggle: () => void;
}

interface Holiday {
    date: string;
    name: string;
    localName?: string;
    nationalHoliday?: boolean;
    holidayTypes?: string[];
}

interface MonthGroup {
    month: number;
    monthName: string;
    events: Holiday[];
}

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

/*
 * Official Indonesia 2026 fallback.
 * Based on SKB 3 Menteri 2026.
 */
const FALLBACK_HOLIDAYS: Holiday[] = [
    {
        date: "2026-01-01",
        name: "Tahun Baru Masehi",
    },
    {
        date: "2026-01-16",
        name: "Isra Mikraj Nabi Muhammad SAW",
    },
    {
        date: "2026-02-17",
        name: "Tahun Baru Imlek 2577 Kongzili",
    },
    {
        date: "2026-03-19",
        name: "Hari Suci Nyepi",
    },
    {
        date: "2026-03-21",
        name: "Hari Raya Idul Fitri 1447 H",
    },
    {
        date: "2026-03-22",
        name: "Hari Raya Idul Fitri 1447 H",
    },
    {
        date: "2026-04-03",
        name: "Wafat Yesus Kristus",
    },
    {
        date: "2026-04-05",
        name: "Hari Kebangkitan Yesus Kristus",
    },
    {
        date: "2026-05-01",
        name: "Hari Buruh Internasional",
    },
    {
        date: "2026-05-14",
        name: "Kenaikan Yesus Kristus",
    },
    {
        date: "2026-05-27",
        name: "Hari Raya Idul Adha 1447 H",
    },
    {
        date: "2026-05-31",
        name: "Hari Raya Waisak 2570 BE",
    },
    {
        date: "2026-06-01",
        name: "Hari Lahir Pancasila",
    },
    {
        date: "2026-06-16",
        name: "1 Muharam / Tahun Baru Islam 1448 H",
    },
    {
        date: "2026-08-17",
        name: "Hari Proklamasi Kemerdekaan Republik Indonesia",
    },
    {
        date: "2026-08-25",
        name: "Maulid Nabi Muhammad SAW",
    },
    {
        date: "2026-12-25",
        name: "Kelahiran Yesus Kristus",
    },
];

const getMonthName = (month: number) => {
    return MONTH_NAMES[month - 1] ?? "";
};

const getDateNumber = (date: string) => {
    return Number(date.split("-")[2]);
};

const getMonthNumber = (date: string) => {
    return Number(date.split("-")[1]);
};

const formatApiName = (holiday: Holiday) => {
    return holiday.localName || holiday.name;
};

const BigDays: React.FC<BigDaysProps> = ({
    active,
    onToggle,
}) => {
    const [holidays, setHolidays] = useState<Holiday[]>(
        FALLBACK_HOLIDAYS
    );

    const [view, setView] = useState<
        "current" | "months" | "month-detail"
    >("current");

    const [selectedMonth, setSelectedMonth] =
        useState<number | null>(null);

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    /*
     * Fetch holiday data from Nager.
     * Fallback remains available if API fails.
     */
    useEffect(() => {
        const loadHolidays = async () => {
            try {
                const response = await fetch(
                    `https://date.nager.at/api/v4/PublicHolidays/${currentYear}/ID`
                );

                if (!response.ok) {
                    throw new Error("Holiday API failed");
                }

                const data = (await response.json()) as Holiday[];

                if (Array.isArray(data) && data.length > 0) {
                    setHolidays(data);
                }
            } catch {
                /*
                 * Keep fallback data.
                 */
            }
        };

        loadHolidays();
    }, [currentYear]);

    const currentMonthEvents = useMemo(() => {
        return holidays
            .filter(
                (holiday) =>
                    getMonthNumber(holiday.date) === currentMonth
            )
            .sort((a, b) =>
                a.date.localeCompare(b.date)
            );
    }, [holidays, currentMonth]);

    const monthGroups = useMemo<MonthGroup[]>(() => {
        const groups = new Map<number, Holiday[]>();

        holidays.forEach((holiday) => {
            const month = getMonthNumber(holiday.date);

            if (!groups.has(month)) {
                groups.set(month, []);
            }

            groups.get(month)!.push(holiday);
        });

        return Array.from(groups.entries())
            .sort(([a], [b]) => a - b)
            .map(([month, events]) => ({
                month,
                monthName: getMonthName(month),
                events: events.sort((a, b) =>
                    a.date.localeCompare(b.date)
                ),
            }));
    }, [holidays]);

    const selectedMonthGroup = useMemo(() => {
        if (!selectedMonth) return null;

        return (
            monthGroups.find(
                (group) => group.month === selectedMonth
            ) ?? null
        );
    }, [selectedMonth, monthGroups]);

    const handleToggle = () => {
        if (active) {
            setView("current");
            setSelectedMonth(null);
        }

        onToggle();
    };

    const handleViewAll = () => {
        setView("months");
        setSelectedMonth(null);
    };

    const handleMonthClick = (month: number) => {
        setSelectedMonth(month);
        setView("month-detail");
    };

    const handleBack = () => {
        if (view === "month-detail") {
            setSelectedMonth(null);
            setView("months");
            return;
        }

        if (view === "months") {
            setView("current");
        }
    };

    return (
        <div
            className="
        w-full
        overflow-hidden
        rounded-xl
        border-2
        border-black
        bg-[#FCF8ED]
        shadow-[3px_3px_0_#000]
      "
        >
            {/* HEADER */}

            <button
                type="button"
                onClick={handleToggle}
                aria-expanded={active}
                className={`
          flex
          min-h-[60px]
          w-full
          items-center
          justify-between
          px-3
          py-3
          transition-colors
          duration-200
          ${active
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
            ${active ? "rotate-90" : ""}
          `}
                />
            </button>

            {/* CONTENT */}

            {active && (
                <div className="px-3 pb-3">
                    {/* CURRENT MONTH */}

                    {view === "current" && (
                        <div className="pt-1">
                            <div className="mb-3 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/50">
                                        This month
                                    </p>

                                    <h3 className="text-lg font-black leading-tight">
                                        {getMonthName(currentMonth)}
                                    </h3>
                                </div>

                                <div
                                    className="
                    rounded-lg
                    border-2
                    border-black
                    bg-white
                    px-2
                    py-1
                    text-xs
                    font-bold
                    shadow-[2px_2px_0_#000]
                  "
                                >
                                    {currentMonthEvents.length}
                                </div>
                            </div>

                            {currentMonthEvents.length > 0 ? (
                                <div className="flex flex-col gap-2">
                                    {currentMonthEvents.map((event) => (
                                        <div
                                            key={event.date}
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
                                                        getMonthNumber(event.date)
                                                    ).slice(0, 3)}
                                                </span>

                                                <span className="text-sm font-black">
                                                    {getDateNumber(event.date)}
                                                </span>
                                            </div>

                                            <p className="min-w-0 text-xs font-bold leading-tight">
                                                {formatApiName(event)}
                                            </p>
                                        </div>
                                    ))}
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
                                    <p className="text-xs font-semibold text-black/50">
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
                  transition-transform
                  hover:-translate-y-[1px]
                  active:translate-y-[2px]
                "
                            >
                                View all big days

                                <ChevronRight size={14} />
                            </button>
                        </div>
                    )}

                    {/* MONTH LIST */}

                    {view === "months" && (
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
                    items-center
                    justify-center
                    rounded-md
                    border-2
                    border-black
                    bg-white
                  "
                                >
                                    <ArrowLeft size={14} />
                                </button>

                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/50">
                                        Indonesia
                                    </p>

                                    <h3 className="text-lg font-black leading-tight">
                                        Big Days
                                    </h3>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                {monthGroups.map((group) => (
                                    <button
                                        key={group.month}
                                        type="button"
                                        onClick={() =>
                                            handleMonthClick(group.month)
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
                      transition-transform
                      hover:translate-x-[2px]
                      active:translate-x-[3px]
                    "
                                    >
                                        <span className="font-bold">
                                            {group.monthName}
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <span className="rounded-md bg-[#d0bdf4] px-1.5 py-0.5 text-[10px] font-black">
                                                {group.events.length}
                                            </span>

                                            <ChevronRight size={15} />
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* MONTH DETAIL */}

                    {view === "month-detail" &&
                        selectedMonthGroup && (
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
                      items-center
                      justify-center
                      rounded-md
                      border-2
                      border-black
                      bg-white
                    "
                                    >
                                        <ArrowLeft size={14} />
                                    </button>

                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/50">
                                            Indonesia
                                        </p>

                                        <h3 className="text-lg font-black leading-tight">
                                            {selectedMonthGroup.monthName}
                                        </h3>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    {selectedMonthGroup.events.map(
                                        (event) => (
                                            <div
                                                key={event.date}
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
                                                        {selectedMonthGroup.monthName.slice(
                                                            0,
                                                            3
                                                        )}
                                                    </span>

                                                    <span className="text-sm font-black">
                                                        {getDateNumber(event.date)}
                                                    </span>
                                                </div>

                                                <p className="text-xs font-bold leading-tight">
                                                    {formatApiName(event)}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                </div>
            )}
        </div>
    );
};

export default BigDays;