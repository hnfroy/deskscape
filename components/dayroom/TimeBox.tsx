"use client";

import { useEffect, useState } from "react";

export default function Timebox() {
  const [now, setNow] = useState(new Date());
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours24 = now.getHours();

  const hourOnly = String(hours24 % 12 || 12).padStart(2, "0");

  const minute = String(now.getMinutes()).padStart(2, "0");

  const ampm = hours24 >= 12 ? "PM" : "AM";

  const day = now
    .toLocaleDateString("en-US", {
      weekday: "short",
    })
    .toUpperCase();

  const month = now
    .toLocaleDateString("en-US", {
      month: "short",
    })
    .toUpperCase();

  const date = now.getDate();

  const [mounted, setMounted] = useState(false);
  const [showColon, setShowColon] = useState(true);

  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setShowColon((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleGlitch = () => {
    if (isGlitching) return;

    setIsGlitching(true);

    window.setTimeout(() => {
      setIsGlitching(false);
    }, 650);
  };

  return (
    <div className="relative w-full max-w-[405px] cursor-pointer" onClick={handleGlitch}>

      <style>{`

        @import url("https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap");

        .display {
            position: absolute;
            left: 51%;
            top: 48%;
            transform: translate(-50%, -50%);
            width: 60%;
            height: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #F8F8F8;
            pointer-events: none;
            font-family: "Share Tech Mono", monospace;
            z-index: 20;
        }

        .display::before{

          content:"";

          position:absolute;
          inset:0;

          background:
            repeating-linear-gradient(
              to bottom,
              rgba(255,255,255,.05) 0px,
              rgba(255,255,255,.05) 2px,
              transparent 2px,
              transparent 4px
            );

          opacity:.18;

          mix-blend-mode:screen;

        }

        .clock{

          display:flex;
          align-items:flex-end;

          font-size:48px;

          font-weight:700;

          letter-spacing:0em;

          text-shadow:
            0 0 4px rgba(255,255,255,.7),
            0 0 10px rgba(255,255,255,.45),
            0 0 18px rgba(255,255,255,.2);

        }

        @keyframes timebox-glitch {

          0% {
            opacity: 1;
            transform: translate(0);
            filter: none;
          }

          10% {
            opacity: .35;
            transform: translate(-2px, 1px);
            filter: blur(1px);
          }

          20% {
            opacity: 1;
            transform: translate(2px, -1px);
            filter: none;
          }

          30% {
            opacity: .2;
            transform: translate(-1px, 0);
            filter: blur(2px);
          }

          42% {
            opacity: .8;
            transform: translate(2px, 1px);
            filter: blur(.5px);
          }

          55% {
            opacity: .25;
            transform: translate(-2px, 0);
            filter: blur(1.5px);
          }

          70% {
            opacity: 1;
            transform: translate(1px, 0);
            filter: none;
          }

          85% {
            opacity: .6;
            transform: translate(0);
            filter: blur(.5px);
          }

          100% {
            opacity: 1;
            transform: translate(0);
            filter: none;
          }

        }

        .clock.glitch {
          animation: timebox-glitch 650ms steps(1, end);
        }

        .colon{

          width:42px;

          text-align:center;

          transition:.15s;

        }

        .ampm{

          margin-left:8px;

          margin-bottom:20px;

          font-size:18px;

          opacity:.8;

        }

        .date{

          margin-top:0px;

          font-size:18px;

          letter-spacing:.14em;

          text-shadow:
            0 0 3px rgba(255,255,255,.6),
            0 0 8px rgba(255,255,255,.2);

        }

      `}</style>

      {/* DIGITAL DISPLAY */}

      <div className="display">

        <div className={`clock ${isGlitching ? "glitch" : ""}`}>

          <span>{hourOnly}</span>

          <span
            className="colon"
            style={{
              opacity: showColon ? 1 : 0.15,
            }}
          >
            :
          </span>

          <span>{minute}</span>

          <span className="ampm">{ampm}</span>

        </div>

        <div className="date">
          {day}, {date} {month}
        </div>

      </div>

      {/* SVG */}

      <svg width="100%" height="auto" viewBox="0 0 464 253" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.8" d="M92.3586 182.438C93.5791 181.505 95.0724 181 96.6083 181H420.528C426.972 181 429.992 188.971 425.167 193.242L399.227 216.198C398.627 216.729 398.123 217.359 397.736 218.06L390.24 231.657C389.753 232.542 389.079 233.311 388.266 233.91L377.981 241.5L360.847 251.187C358.745 252.375 356.372 253 353.957 253H20.6925C13.9969 253 11.1223 244.502 16.4428 240.438L92.3586 182.438Z" fill="#96908A" fillOpacity="0.6"/>
      <path d="M128.536 165.438C129.279 164.737 130.261 164.346 131.283 164.346H453.482C457.141 164.346 458.879 168.851 456.169 171.309L389.297 231.963C388.561 232.63 387.604 233 386.61 233H67.0609C63.4419 233 61.6834 228.577 64.3144 226.092L128.536 165.438Z" fill="#090D0E"/>
      <path d="M81.7269 29.2404C82.0091 29.0598 82.3165 28.87 82.616 28.7209C88.17 25.9549 93.7626 23.5103 99.3959 20.9623L118.301 12.2057C121.737 10.6198 137.591 2.578 140.208 2.4691C151.614 1.99451 169.556 2.02107 180.899 2.11622L246.579 2.18991L428.217 2.00001C429.706 2.01288 431.961 2.0567 433.305 2.5715C436.827 3.91944 439.769 6.67253 441.424 10.0129C441.583 10.7896 441.82 11.4876 441.598 12.2175C439.624 14.4887 436.744 16.5215 434.21 18.1619C421.289 26.53 407.559 33.7552 394.68 42.1051C394.56 42.1836 394.251 42.0093 394.133 41.9558C392.721 36.1641 388.186 32.1203 382.738 30.1355C381.522 30.2277 379.083 29.9507 377.637 29.9247L365.255 29.794C356.186 29.6375 346.738 29.8357 337.596 29.8669L217.522 29.7617L127.521 29.9819C115.765 29.9842 104.109 30.0019 92.3598 29.5319C91.2415 29.4872 90.3191 29.5472 89.2092 29.3198C86.6068 29.2255 84.3414 29.1499 81.7269 29.2404Z" fill="#B19BCA" stroke="#262626" strokeWidth="4"/>
      <path d="M441.424 10.0128C442.098 11.3772 442.247 12.3226 442.292 13.8378C442.638 25.351 442.525 36.9619 442.527 48.4841L442.49 108.913L442.556 144.742C442.566 150.411 443.234 166.259 441.747 170.754C441.242 172.278 440.341 173.539 439.297 174.741C436.274 178.224 432.548 181.074 429.101 184.117L406.066 204.26C402.403 207.459 397.978 210.819 394.771 214.292L394.617 214.547L394.337 214.308C393.592 209.491 393.831 196.436 393.833 191.251L393.835 150.676L393.814 82.784C393.814 69.6385 393.526 55.7405 394.137 42.6866L394.133 41.9557C394.252 42.0092 394.56 42.1835 394.681 42.105C407.559 33.7551 421.289 26.5299 434.211 18.1618C436.744 16.5214 439.624 14.4886 441.598 12.2174C441.82 11.4875 441.583 10.7895 441.424 10.0128Z" fill="#766A84" stroke="#262626" strokeWidth="4"/>
      <path d="M397.108 207.08C397.218 209.114 396.761 211.766 395.576 213.386C393.889 215.696 391.478 218.148 388.493 218.47C384.642 218.885 380.189 218.834 376.322 218.828L356.534 218.789L283.117 218.752L151.427 218.714C136.885 218.799 122.341 218.805 107.799 218.732C101.212 218.724 94.5932 218.875 88.0214 218.728C84.6347 218.652 81.5969 218.446 78.7967 216.391C76.0835 214.399 73.9048 212.174 73.4188 208.698C73.0527 206.081 73.1773 202.906 73.1806 200.228L73.1538 188.529L73.3587 140.874L73.2494 72.4565L73.2715 52.8045C73.2839 48.6633 73.3863 44.6066 73.4453 40.4319C73.5001 36.5708 76.7838 31.559 80.7231 30.9941C84.8596 30.4007 89.8547 30.5535 94.1082 30.5484L114.071 30.5135C143.437 30.254 172.804 30.2013 202.171 30.3551L324.377 30.3515L366.528 30.3441C373.135 30.3523 379.748 30.3445 386.352 30.3545C388.093 30.4585 390.001 30.6162 391.513 31.578C394.534 33.4986 396.855 36.3205 397.294 39.9216C397.713 41.6085 397.682 46.2128 397.709 48.1629C397.772 53.6347 397.792 59.107 397.77 64.5792L397.741 117.598L397.764 180.489C397.745 187.416 397.823 194.406 397.49 201.317C397.427 202.622 397.351 206.04 397.108 207.08Z" fill="#B19BCA" stroke="#262626" strokeWidth="4"/>
      <path d="M109.168 48.9044C114.071 48.7475 119.748 48.9575 124.752 48.9524L156.911 48.8729L252.684 48.9283L330.721 48.9663C336.625 49.0078 342.531 49.0047 348.435 48.9571C354.202 48.9077 359.82 48.8298 365.673 49.039C370.116 49.198 374.061 52.1596 375.086 56.6421C375.511 58.4968 375.311 61.7926 375.305 63.8034L375.27 74.7992L375.221 118.777L375.256 166.749L375.301 180.71C375.317 185.265 376.081 190.272 373.321 194.037C370.662 197.665 367.75 198.997 363.465 199.781C362.966 199.851 362.466 199.9 361.963 199.931C357.732 200.221 352.276 200.063 347.971 200.049L324.835 200.002L244.097 199.988L150.922 199.975L120.834 199.835C116.028 199.804 111.24 199.869 106.434 199.734C100.254 199.563 96.0248 193.998 95.9139 188.095C95.7145 177.49 95.9361 166.89 95.9997 156.287L95.874 110.428L95.7692 73.7547C95.7972 68.7288 95.7862 63.4007 95.9874 58.3754C96.0661 56.4088 97.2485 54.1011 98.606 52.6585C101.626 49.4496 105.068 49.0876 109.168 48.9044Z" fill="#050607" stroke="#262626" strokeWidth="1.5"/>
      </svg>

    </div>
  );
}