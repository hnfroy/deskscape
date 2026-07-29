const RING_COUNT = 10;
const RING_SPACING = 67;

export default function CalendarBase() {
  return (
    <svg
      viewBox="0 0 880 674"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <defs>
        <g id="ring-shape">
          <path
            d="M170.5 0C180.165 0 188 11.1929 188 25C188 38.5682 180.434 49.6111 171 49.9893V45.9834C174.011 45.801 177.086 43.9714 179.598 40.3838C182.239 36.61 184 31.1834 184 25C184 18.8166 182.239 13.39 179.598 9.61621C176.947 5.82979 173.669 4 170.5 4C167.331 4 164.053 5.82979 161.402 9.61621C158.761 13.39 157 18.8166 157 25H153C153 11.1929 160.835 0 170.5 0Z"
            fill="var(--calendar-ring)"
          />
          <rect x="163" y="40" width="15" height="15" rx="7.5" fill="var(--calendar-ring)" />
        </g>
      </defs>

      {/* surface: shadow cast on the desk */}
      <g id="surface">
        <path
          opacity="0.8"
          d="M8.16936 607.812C6.23021 606.907 6.87522 604 9.01513 604H729.556C729.849 604 730.137 604.064 730.402 604.188L871.831 670.188C873.77 671.093 873.125 674 870.985 674H150.444C150.151 674 149.863 673.936 149.598 673.812L8.16936 607.812Z"
          fill="var(--calendar-shadow)"
        />
      </g>

      {/* stand: back easel / tent-fold support */}
      <g id="stand">
        <path
          d="M137.862 608H33.2529L100.433 45.6064L137.862 608Z"
          fill="var(--calendar-stand-side)"
          stroke="black"
          strokeWidth="4"
        />
        <path
          d="M137.78 610L145.462 660.608L37.0156 610H137.78Z"
          fill="var(--calendar-stand-base)"
          stroke="black"
          strokeWidth="4"
        />
      </g>

      {/* paper-back: static bottom of the stack, revealed once paper-front flips away */}
      <g id="paper-back">
        <path
          d="M111.773 26H807.727C813.007 26 817.378 30.1057 817.707 35.376L856.207 651.376C856.567 657.133 851.995 662 846.227 662H150.273C144.993 662 140.622 657.894 140.293 652.624L101.793 36.624C101.433 30.867 106.005 26 111.773 26Z"
          fill="var(--calendar-paper-back)"
          stroke="black"
          strokeWidth="4"
        />
        <path
          d="M123.794 25H819.745C825.547 25.0003 830.35 29.5062 830.722 35.2959L869.184 635.296C869.59 641.635 864.558 647 858.206 647H162.255C156.453 647 151.65 642.494 151.278 636.704L112.816 36.624C112.41 30.3651 117.442 25 123.794 25Z"
          fill="var(--calendar-paper-front)"
          stroke="black"
          strokeWidth="2"
        />
      </g>

      {/* rings: 10 instances of one template, spaced 67px apart — matches the original art exactly */}
      <g id="rings">
        {Array.from({ length: RING_COUNT }).map((_, i) => (
          <use
            key={i}
            href="#ring-shape"
            data-ring-index={i}
            transform={`translate(${i * RING_SPACING}, 0)`}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}
      </g>
    </svg>
  );
}
