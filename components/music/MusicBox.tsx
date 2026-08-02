"use client";

import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipForward,
} from "lucide-react";

const BASE_PATH =
  process.env.NODE_ENV === "production"
    ? "/deskscape"
    : "";

const MUSIC_URL =
  `${BASE_PATH}/music/way-home-tokyowalker.mp3`;

export default function MusicBox() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const song = {
    title: "Way Home",
    artist: "Tokyo Walker",
    src: MUSIC_URL,
  };

  /* =========================
     AUDIO
  ========================= */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (Number.isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      console.error(
        "Music failed to load:",
        audio.error,
        "\nMusic URL:",
        audio.currentSrc
      );
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const autoPlay = async () => {
      try {
        audio.volume = 0.5;

        await audio.play();

        setIsPlaying(true);
      } catch (error) {
        console.log("Autoplay blocked by browser.");
      }
    };

    autoPlay();
  }, []);

  /* =========================
     PLAY / PAUSE
  ========================= */

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Audio failed to play:", error);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  /* =========================
     NEXT
  ========================= */

  const handleNext = () => {
    const audio = audioRef.current;

    if (!audio) return;

    // Karena sekarang baru ada 1 lagu,
    // next akan mengulang lagu dari awal.
    audio.currentTime = 0;

    if (isPlaying) {
      audio.play().catch(console.error);
    }
  };

  /* =========================
     PROGRESS
  ========================= */

  const handleProgress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const audio = audioRef.current;

    if (!audio) return;

    const value = Number(event.target.value);

    audio.currentTime = value;
    setCurrentTime(value);
  };

  /* =========================
     TIME FORMAT
  ========================= */

  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative w-full">

      {/* AUDIO */}

      <audio
        ref={audioRef}
        src={song.src}
        preload="metadata"
      />

      {/* =========================
          MUSIC BOX SVG
      ========================= */}

      <svg
        width="100%"
        height="auto"
        viewBox="0 0 225 153"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="138"
          width="223"
          height="14"
          rx="5"
          fill="url(#paint0_linear_375_211)"
          stroke="black"
          strokeWidth="2"
        />

        <path
          d="M14.0625 1H210.938C213.069 1 215.035 2.14587 216.086 4L220.561 11.8994L223.649 22H1.35059L4.43848 11.8994L8.91406 4C9.9647 2.14587 11.9314 1 14.0625 1Z"
          fill="url(#paint1_linear_375_211)"
          stroke="black"
          strokeWidth="2"
        />

        <rect
          x="1"
          y="13"
          width="223"
          height="132"
          rx="11"
          fill="#25211F"
          stroke="url(#paint2_linear_375_211)"
          strokeWidth="2"
        />

        <rect
          x="10.5"
          y="19.5"
          width="204"
          height="99"
          rx="7.5"
          fill="#0E0E0C"
          stroke="black"
        />

        {/* =========================
            DISC
        ========================= */}

        <g
          className={
            isPlaying
              ? "music-disc music-disc-playing"
              : "music-disc"
          }
        >
          <circle
            cx="61"
            cy="69"
            r="37"
            fill="url(#paint3_radial_375_211)"
            stroke="black"
            strokeWidth="2"
          />

          <circle
            cx="61"
            cy="69"
            r="17"
            fill="#020204"
          />

          <circle
            cx="61"
            cy="69"
            r="11"
            fill="#875F9A"
          />

          <path
            d="M60.5146 64.9679C60.6396 64.4609 61.3604 64.4609 61.4854 64.9679L62.0282 67.1678C62.0614 67.3028 62.1494 67.4178 62.271 67.4852L64.2124 68.5628C64.5555 68.7533 64.5555 69.2467 64.2124 69.4372L62.271 70.5148C62.1494 70.5822 62.0614 70.6972 62.0282 70.8322L61.4854 73.0321C61.3604 73.5391 60.6396 73.5391 60.5146 73.0321L59.9718 70.8322C59.9386 70.6972 59.8506 70.5822 59.729 70.5148L57.7876 69.4372C57.4445 69.2467 57.4445 68.7533 57.7876 68.5628L59.729 67.4852C59.8506 67.4178 59.9386 67.3028 59.9718 67.1678L60.5146 64.9679Z"
            fill="#020204"
          />
        </g>

        {/* =========================
            BUTTON BACKGROUND
        ========================= */}

        <rect
          x="10.5"
          y="124.5"
          width="17"
          height="13"
          rx="4.5"
          fill="#37302C"
          stroke="black"
        />

        <rect
          x="32.5"
          y="124.5"
          width="17"
          height="13"
          rx="4.5"
          fill="#37302C"
          stroke="black"
        />

        <defs>
          <linearGradient
            id="paint0_linear_375_211"
            x1="112.5"
            y1="137"
            x2="112.5"
            y2="153"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop offset="1" stopColor="#0F0D0B" />
          </linearGradient>

          <linearGradient
            id="paint1_linear_375_211"
            x1="0"
            y1="11.5"
            x2="225"
            y2="11.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3C3430" />
            <stop offset="0.0493667" stopColor="#2D2825" />
            <stop offset="0.231394" stopColor="#50433C" />
            <stop offset="0.519231" stopColor="#3C3430" />
            <stop offset="0.783654" stopColor="#50433C" />
            <stop offset="0.952439" stopColor="#38312D" />
            <stop offset="1" stopColor="#3C3430" />
          </linearGradient>

          <linearGradient
            id="paint2_linear_375_211"
            x1="112.5"
            y1="12"
            x2="112.5"
            y2="146"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#919191" />
            <stop offset="0.0576923" stopColor="#353535" />
            <stop offset="1" />
          </linearGradient>

          <radialGradient
            id="paint3_radial_375_211"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(61 69) rotate(90) scale(38)"
          >
            <stop stopColor="#0D0D0B" />
            <stop offset="1" stopColor="#22201C" />
          </radialGradient>
        </defs>
      </svg>

      {/* =========================
          HTML MUSIC PLAYER
      ========================= */}

      <div className="music-player">

        {/* Song info */}

        <div className="music-info">
          <div className="music-title">
            {song.title}
          </div>

          <div className="music-artist">
            {song.artist}
          </div>
        </div>

        {/* Progress */}

        <div className="music-progress-row">

          <span>
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgress}
            className="music-progress"
          />

          <span>
            {formatTime(duration)}
          </span>

        </div>

        {/* Controls */}

        <div className="music-controls">

          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            className="music-button music-play"
          >
            {isPlaying ? (
              <Pause size={11} strokeWidth={2.5} />
            ) : (
              <Play
                size={11}
                strokeWidth={2.5}
                fill="currentColor"
              />
            )}
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next music"
            className="music-button"
          >
            <SkipForward
              size={11}
              strokeWidth={2.5}
              fill="currentColor"
            />
          </button>

        </div>

      </div>

      {/* =========================
          STYLES
      ========================= */}

      <style jsx>{`

        .music-disc {
          transform-origin: 61px 69px;
        }

        .music-disc-playing {
          animation: discSpin 3s linear infinite;
        }

        @keyframes discSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        .music-player {
          position: absolute;

          left: 45%;
          top: 45%;

          width: 48%;
          height: 55%;

          transform: translateY(-50%);

          display: flex;
          flex-direction: column;

          justify-content: center;

          padding: 7px 8px;

          color: #f5f2ef;

          font-family:
            Inter,
            Arial,
            sans-serif;

          pointer-events: auto;
        }

        .music-info {
          min-width: 0;

          margin-bottom: 6px;
        }

        .music-title {
          overflow: hidden;

          white-space: nowrap;

          text-overflow: ellipsis;

          font-size: 18px;

          font-weight: 700;

          letter-spacing: -0.01em;
        }

        .music-artist {
          margin-top: 1px;

          font-size: 12px;

          color: rgba(255,255,255,.5);

          white-space: nowrap;

          overflow: hidden;

          text-overflow: ellipsis;
        }

        .music-progress-row {
          display: flex;

          align-items: center;

          gap: 4px;

          width: 100%;

          font-size: 8px;

          color: rgba(255,255,255,.45);
        }

        .music-progress {
          flex: 1;

          min-width: 0;

          height: 2px;

          appearance: none;

          background: rgba(255,255,255,.18);

          border-radius: 999px;

          cursor: pointer;
        }

        .music-progress::-webkit-slider-thumb {
          appearance: none;

          width: 5px;

          height: 5px;

          border-radius: 50%;

          background: #b19bca;

          cursor: pointer;
        }

        .music-progress::-moz-range-thumb {
          width: 5px;

          height: 5px;

          border: 0;

          border-radius: 50%;

          background: #b19bca;

          cursor: pointer;
        }

        .music-controls {
          display: flex;

          align-items: center;

          gap: 4px;

          margin-top: 6px;
        }

        .music-button {
          width: 20px;
          height: 16px;

          display: flex;

          align-items: center;
          justify-content: center;

          padding: 0;

          border: 1px solid rgba(255,255,255,.08);

          border-radius: 4px;

          background: rgba(55,48,44,.9);

          color: #ded8d4;

          cursor: pointer;

          transition:
            transform .15s ease,
            background .15s ease,
            color .15s ease;
        }

        .music-button:hover {
          background: #4b403a;

          color: white;

          transform: translateY(-1px);
        }

        .music-button:active {
          transform: translateY(0) scale(.94);
        }

        .music-play {
          background: #875f9a;

          color: white;
        }

        .music-play:hover {
          background: #996caf;
        }

      `}</style>

    </div>
  );
}