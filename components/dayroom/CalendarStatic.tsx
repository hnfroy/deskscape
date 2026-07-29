import { format } from "date-fns";
import CalendarBase from "../calendar/CalendarBase";
import CalendarPaperFront from "../calendar/CalendarPaperFront";
import MonthGrid from "./MonthGrid";

export default function CalendarStatic({ date }: { date: Date }) {
  return (
    <div className="relative aspect-[880/674] w-full">
      <div className="absolute inset-0">
        <CalendarBase />
      </div>
      <div className="absolute inset-0">
        <CalendarPaperFront />
      </div>

      <div
        className="absolute flex items-start justify-between gap-6"
        style={{ left: "17.05%", top: "9%", width: "80.7%", height: "84%" }}
      >
        <div className="flex flex-col">
          <span className="text-xl font-bold uppercase tracking-wide text-black">
            {format(date, "MMMM")}
          </span>
          <span className="text-7xl font-bold leading-none text-black">
            {format(date, "d")}
          </span>
          <span className="mt-4 inline-block w-fit rounded-full bg-[#C2A3DD] px-4 py-1.5 text-sm font-bold uppercase text-white">
            {format(date, "EEEE")}
          </span>
        </div>

        <div className="pt-1">
          <MonthGrid date={date} />
        </div>
      </div>
    </div>
  );
}