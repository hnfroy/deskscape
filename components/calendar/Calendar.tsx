"use client";

import { useState } from "react";
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay,
  addMonths,
  subMonths
} from "date-fns";
import { id } from "date-fns/locale";

interface CalendarProps {
  date?: Date; 
}

const HOLIDAYS: Record<string, string> = {
  "2026-01-01": "Tahun Baru Masehi",
  "2026-03-20": "Hari Raya Idul Fitri (Estimasi)",
  "2026-03-21": "Cuti Bersama Idul Fitri",
  "2026-05-01": "Hari Buruh Internasional",
  "2026-05-14": "Kenaikan Isa Al Masih",
  "2026-06-01": "Hari Lahir Pancasila",
  "2026-08-17": "Hari Kemerdekaan RI",
  "2026-12-25": "Hari Raya Natal",
};

export default function Calendar({ date = new Date() }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState(date);
  const [currentMonthView, setCurrentMonthView] = useState(startOfMonth(date));

  const monthStart = startOfMonth(currentMonthView);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const weekDays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  const handlePrevMonth = () => setCurrentMonthView(subMonths(currentMonthView, 1));
  const handleNextMonth = () => setCurrentMonthView(addMonths(currentMonthView, 1));

  const selectedDateFormatted = format(selectedDate, "yyyy-MM-dd");
  const activeHoliday = HOLIDAYS[selectedDateFormatted];

  return (
    <div className="relative w-full max-w-[450px]">
      {/* Kertas SVG Utama */}
      <svg width="100%" height="auto" viewBox="0 0 810 628" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M38.8306 564.37C39.5569 563.18 40.8506 562.454 42.245 562.454H767.755C769.149 562.454 770.443 563.18 771.169 564.37L806.287 621.916C807.914 624.582 805.996 628 802.873 628H7.12701C4.00441 628 2.08598 624.582 3.7126 621.916L38.8306 564.37Z" fill="black"/>
        <path d="M43.9316 30H766.068C769.362 30 772.04 32.6549 772.068 35.9482L776.931 599.78C776.959 603.114 774.265 605.832 770.931 605.832H39.0693C35.7355 605.832 33.0407 603.114 33.0693 599.78L37.9316 35.9482C37.9601 32.6549 40.6381 30 43.9316 30Z" fill="#C2A3DD" stroke="black" strokeWidth="4"/>
        <rect x="48" y="24" width="714" height="566" rx="10" fill="#F6EDE2" stroke="black" strokeWidth="4"/>
        <path d="M102.5 0C112.165 0 114 10.7858 114 24.0908C114 37.1631 112.229 47.8026 103 48.1709V44.166C104.333 44.0865 105.218 43.6883 105.883 43.1592C106.687 42.5192 107.47 41.4426 108.138 39.6973C109.519 36.0839 110 30.7136 110 24.0908C110 17.468 109.519 12.0977 108.138 8.48438C107.47 6.73908 106.687 5.66246 105.883 5.02246C105.138 4.42976 104.117 4 102.5 4C100.883 4 99.8617 4.42976 99.1172 5.02246C98.3133 5.66246 97.5297 6.73908 96.8623 8.48438C95.4808 12.0977 95 17.468 95 24.0908H91C91 10.7858 92.835 0 102.5 0Z" fill="black"/>
        <rect x="96" y="40" width="15" height="15" rx="7.5" fill="black"/>
        <path d="M170.5 0C180.165 0 182 10.7858 182 24.0908C182 37.1631 180.229 47.8026 171 48.1709V44.166C172.333 44.0865 173.218 43.6883 173.883 43.1592C174.687 42.5192 175.47 41.4426 176.138 39.6973C177.519 36.0839 178 30.7136 178 24.0908C178 17.468 177.519 12.0977 176.138 8.48438C175.47 6.73908 174.687 5.66246 173.883 5.02246C173.138 4.42976 172.117 4 170.5 4C168.883 4 167.862 4.42976 167.117 5.02246C166.313 5.66246 165.53 6.73908 164.862 8.48438C163.481 12.0977 163 17.468 163 24.0908H159C159 10.7858 160.835 0 170.5 0Z" fill="black"/>
        <rect x="164" y="40" width="15" height="15" rx="7.5" fill="black"/>
        <path d="M237.5 0C247.165 0 249 10.7858 249 24.0908C249 37.1631 247.229 47.8026 238 48.1709V44.166C239.333 44.0865 240.218 43.6883 240.883 43.1592C241.687 42.5192 242.47 41.4426 243.138 39.6973C244.519 36.0839 245 30.7136 245 24.0908C245 17.468 244.519 12.0977 243.138 8.48438C242.47 6.73908 241.687 5.66246 240.883 5.02246C240.138 4.42976 239.117 4 237.5 4C235.883 4 234.862 4.42976 234.117 5.02246C233.313 5.66246 232.53 6.73908 231.862 8.48438C230.481 12.0977 230 17.468 230 24.0908H226C226 10.7858 227.835 0 237.5 0Z" fill="black"/>
        <rect x="231" y="40" width="15" height="15" rx="7.5" fill="black"/>
        <path d="M304.5 0C314.165 0 316 10.7858 316 24.0908C316 37.1631 314.229 47.8026 305 48.1709V44.166C306.333 44.0865 307.218 43.6883 307.883 43.1592C308.687 42.5192 309.47 41.4426 310.138 39.6973C311.519 36.0839 312 30.7136 312 24.0908C312 17.468 311.519 12.0977 310.138 8.48438C309.47 6.73908 308.687 5.66246 307.883 5.02246C307.138 4.42976 306.117 4 304.5 4C302.883 4 301.862 4.42976 301.117 5.02246C300.313 5.66246 299.53 6.73908 298.862 8.48438C297.481 12.0977 297 17.468 297 24.0908H293C293 10.7858 294.835 0 304.5 0Z" fill="black"/>
        <rect x="298" y="40" width="15" height="15" rx="7.5" fill="black"/>
        <path d="M371.5 0C381.165 0 383 10.7858 383 24.0908C383 37.1631 381.229 47.8026 372 48.1709V44.166C373.333 44.0865 374.218 43.6883 374.883 43.1592C375.687 42.5192 376.47 41.4426 377.138 39.6973C378.519 36.0839 379 30.7136 379 24.0908C379 17.468 378.519 12.0977 377.138 8.48438C376.47 6.73908 375.687 5.66246 374.883 5.02246C374.138 4.42976 373.117 4 371.5 4C369.883 4 368.862 4.42976 368.117 5.02246C367.313 5.66246 366.53 6.73908 365.862 8.48438C364.481 12.0977 364 17.468 364 24.0908H360C360 10.7858 361.835 0 371.5 0Z" fill="black"/>
        <rect x="365" y="40" width="15" height="15" rx="7.5" fill="black"/>
        <path d="M438.5 0C448.165 0 450 10.7858 450 24.0908C450 37.1631 448.229 47.8026 439 48.1709V44.166C440.333 44.0865 441.218 43.6883 441.883 43.1592C442.687 42.5192 443.47 41.4426 444.138 39.6973C445.519 36.0839 446 30.7136 446 24.0908C446 17.468 445.519 12.0977 444.138 8.48438C443.47 6.73908 442.687 5.66246 441.883 5.02246C441.138 4.42976 440.117 4 438.5 4C436.883 4 435.862 4.42976 435.117 5.02246C434.313 5.66246 433.53 6.73908 432.862 8.48438C431.481 12.0977 431 17.468 431 24.0908H427C427 10.7858 428.835 0 438.5 0Z" fill="black"/>
        <rect x="432" y="40" width="15" height="15" rx="7.5" fill="black"/>
        <path d="M505.5 0C515.165 0 517 10.7858 517 24.0908C517 37.1631 515.229 47.8026 506 48.1709V44.166C507.333 44.0865 508.218 43.6883 508.883 43.1592C509.687 42.5192 510.47 41.4426 511.138 39.6973C512.519 36.0839 513 30.7136 513 24.0908C513 17.468 512.519 12.0977 511.138 8.48438C510.47 6.73908 509.687 5.66246 508.883 5.02246C508.138 4.42976 507.117 4 505.5 4C503.883 4 502.862 4.42976 502.117 5.02246C501.313 5.66246 500.53 6.73908 499.862 8.48438C498.481 12.0977 498 17.468 498 24.0908H494C494 10.7858 495.835 0 505.5 0Z" fill="black"/>
        <rect x="499" y="40" width="15" height="15" rx="7.5" fill="black"/>
        <path d="M572.5 0C582.165 0 584 10.7858 584 24.0908C584 37.1631 582.229 47.8026 573 48.1709V44.166C574.333 44.0865 575.218 43.6883 575.883 43.1592C576.687 42.5192 577.47 41.4426 578.138 39.6973C579.519 36.0839 580 30.7136 580 24.0908C580 17.468 579.519 12.0977 578.138 8.48438C577.47 6.73908 576.687 5.66246 575.883 5.02246C575.138 4.42976 574.117 4 572.5 4C570.883 4 569.862 4.42976 569.117 5.02246C568.313 5.66246 567.53 6.73908 566.862 8.48438C565.481 12.0977 565 17.468 565 24.0908H561C561 10.7858 562.835 0 572.5 0Z" fill="black"/>
        <rect x="566" y="40" width="15" height="15" rx="7.5" fill="black"/>
        <path d="M639.5 0C649.165 0 651 10.7858 651 24.0908C651 37.1631 649.229 47.8026 640 48.1709V44.166C641.333 44.0865 642.218 43.6883 642.883 43.1592C643.687 42.5192 644.47 41.4426 645.138 39.6973C646.519 36.0839 647 30.7136 647 24.0908C647 17.468 646.519 12.0977 645.138 8.48438C644.47 6.73908 643.687 5.66246 642.883 5.02246C642.138 4.42976 641.117 4 639.5 4C637.883 4 636.862 4.42976 636.117 5.02246C635.313 5.66246 634.53 6.73908 633.862 8.48438C632.481 12.0977 632 17.468 632 24.0908H628C628 10.7858 629.835 0 639.5 0Z" fill="black"/>
        <rect x="633" y="40" width="15" height="15" rx="7.5" fill="black"/>
        <path d="M706.5 0C716.165 0 718 10.7858 718 24.0908C718 37.1631 716.229 47.8026 707 48.1709V44.166C708.333 44.0865 709.218 43.6883 709.883 43.1592C710.687 42.5192 711.47 41.4426 712.138 39.6973C713.519 36.0839 714 30.7136 714 24.0908C714 17.468 713.519 12.0977 712.138 8.48438C711.47 6.73908 710.687 5.66246 709.883 5.02246C709.138 4.42976 708.117 4 706.5 4C704.883 4 703.862 4.42976 703.117 5.02246C702.313 5.66246 701.53 6.73908 700.862 8.48438C699.481 12.0977 699 17.468 699 24.0908H695C695 10.7858 696.835 0 706.5 0Z" fill="black"/>
        <rect x="700" y="40" width="15" height="15" rx="7.5" fill="black"/>
      </svg>

      {/* Konten Kalender */}
      <div 
        className="absolute flex flex-col font-sans"
        style={{ 
          top: '12%',
          left: '7.5%', 
          right: '7.5%', 
          bottom: '8%' 
        }}
      >
        {/* ROW 1: HEADER (Bulan di kiri, Navigasi Next/Prev di Kanan Berdempetan) */}
        <div className="flex justify-between items-center mb-2 px-1">
          {/* Box Kiri: Bulan & Tahun */}
          <h2 className="text-xl font-black text-black tracking-wide uppercase">
            {format(selectedDate, "EE, dd MMM yyyy", { locale: id })}
          </h2>

          {/* Box Kanan: Grup Tombol Prev & Next */}
          <div className="flex gap-1.5 lg:gap-2">
            <button 
              onClick={handlePrevMonth}
              className="flex items-center justify-center w-7 h-7 bg-[#F9F5F0] rounded-full border-1 border-transparent hover:border-black hover:bg-black/5 active:translate-y-[2px] transition-all"
            >
              <span className="text-lg lg:text-xl font-bold font-mono pb-1">{"<"}</span>
            </button>
            <button 
              onClick={handleNextMonth}
              className="flex items-center justify-center w-7 h-7 bg-[#F9F5F0] rounded-full border-1 border-transparent hover:border-black hover:bg-black/5 active:translate-y-[2px] transition-all"
            >
              <span className="text-lg lg:text-xl font-bold font-mono pb-1">{">"}</span>
            </button>
          </div>
        </div>

        {/* ROW 2: Header Nama Hari */}
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map(day => (
            <div key={day} className="text-center font-bold lg:text-xs text-gray-800 uppercase tracking-widest pb-1">
              {day}
            </div>
          ))}
        </div>

        {/* ROW 3+: Grid Angka Kalender dengan Box/Blok Layout */}
        <div className="grid grid-cols-7 gap-1.5 flex-grow items-start content-start">
          {days.map((day, idx) => {
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isSelectedDay = isSameDay(day, selectedDate);
            
            const dayFormatted = format(day, "yyyy-MM-dd");
            const isHoliday = !!HOLIDAYS[dayFormatted];

            return (
              <div key={idx} className="flex justify-center w-full">
                <button 
                  onClick={() => setSelectedDate(day)}
                  type="button"
                  // Desain tombol dibuat persegi panjang 'rounded-md w-full' dan memiliki warna dasar ('bg-black/5') agar mirip seperti box abu-abu di wireframe
                  className={`
                    flex items-center justify-center w-6 h-6 rounded-full text-xs lg:text-sm font-bold transition-all duration-200 cursor-pointer border-2
                    ${!isCurrentMonth 
                      ? 'text-gray-400/40 bg-transparent border-transparent' 
                      : isSelectedDay 
                        ? 'bg-black text-[#F6EDE2] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:bg-gray-800 hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-none' 
                        : isHoliday
                          ? 'text-red-600 bg-red-50 border-transparent hover:bg-red-100 hover:border-red-200'
                          : 'text-black bg-black/5 border-transparent hover:bg-black/10 hover:border-black/20'
                    }
                  `}
                >
                  {format(day, "d")}
                </button>
              </div>
            );
          })}
        </div>

        {/* <div className="mt-1 pt-2 border-t-2 border-black/10 flex flex-col items-center justify-center text-center">
          <p className="text-xs lg:text-sm font-bold text-black capitalize">
            {format(selectedDate, "EEEE, d MMMM yyyy", { locale: id })}
          </p>
          {activeHoliday && (
            <p className="text-[10px] lg:text-xs font-bold text-red-600 mt-0.5 tracking-wide">
              🎉 {activeHoliday}
            </p>
          )}
        </div> */}
      </div>
    </div>
  );
}