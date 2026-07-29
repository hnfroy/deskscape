import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
} from "date-fns";

const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function MonthGrid({ date }: { date: Date }) {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  return (
    <table className="border-collapse text-center text-[11px] font-semibold tracking-wide text-black">
      <thead>
        <tr>
          {WEEKDAYS.map((w) => (
            <th key={w} className="px-1.5 pb-2 font-semibold text-black/70">
              {w}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: days.length / 7 }).map((_, row) => (
          <tr key={row}>
            {days.slice(row * 7, row * 7 + 7).map((d) => {
              const outside = !isSameMonth(d, date);
              const isToday = isSameDay(d, date);
              return (
                <td key={d.toISOString()} className="px-1.5 py-1">
                  <span
                    className={
                      isToday
                        ? "flex h-6 w-6 items-center justify-center rounded-full bg-[#C2A3DD] text-white"
                        : outside
                          ? "text-black/30"
                          : "text-black"
                    }
                  >
                    {format(d, "d")}
                  </span>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}