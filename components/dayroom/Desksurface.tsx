export default function DeskSurface() {
  return (
    <svg width="1804" height="259" viewBox="0 0 1804 259" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_n_301_299)">
      <path d="M1802 257H2V172L452 2H1802V257Z" fill="#D7BC9B"/>
      <path d="M1802 257V259H1804V257H1802ZM2 257H0V259H2V257ZM2 172L1.2932 170.129L0 170.618V172H2ZM452 2V0H451.635L451.293 0.129056L452 2ZM1802 2H1804V0H1802V2ZM1802 257V255H2V257V259H1802V257ZM2 257H4V172H2H0V257H2ZM2 172L2.7068 173.871L452.707 3.87094L452 2L451.293 0.129056L1.2932 170.129L2 172ZM452 2V4H1802V2V0H452V2ZM1802 2H1800V257H1802H1804V2H1802Z" fill="black"/>
      </g>
      <defs>
      <filter id="filter0_n_301_299" x="0" y="0" width="1804" height="259" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feTurbulence type="fractalNoise" baseFrequency="1 1" stitchTiles="stitch" numOctaves="3" result="noise" seed="3592" />
      <feComponentTransfer in="noise" result="coloredNoise1">
      <feFuncR type="linear" slope="2" intercept="-0.5" />
      <feFuncG type="linear" slope="2" intercept="-0.5" />
      <feFuncB type="linear" slope="2" intercept="-0.5" />
      <feFuncA type="discrete" tableValues="0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "/>
      </feComponentTransfer>
      <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
      <feComponentTransfer in="noise1Clipped" result="color1">
      <feFuncA type="table" tableValues="0 0.2" />
      </feComponentTransfer>
      <feMerge result="effect1_noise_301_299">
      <feMergeNode in="shape" />
      <feMergeNode in="color1" />
      </feMerge>
      </filter>
      </defs>
    </svg>
  );
}
