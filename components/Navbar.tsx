"use client";

import React, { useEffect, useState } from "react";
import {
  CloudRain,
  Sun,
  Cloud,
  CloudLightning,
  CloudSnow,
} from "lucide-react";

interface NavbarProps {
  className?: string;
  latitude?: number;
  longitude?: number;
}

interface WeatherData {
  temp: number;
  condition: string;
  code: number;
}

const Navbar: React.FC<
  NavbarProps & { isStandaloneWidgets?: boolean }
> = ({
  className = "",
  latitude = -6.2088,
  longitude = 106.8456,
  isStandaloneWidgets = false,
}) => {
  const [weather, setWeather] = useState<WeatherData>({
    temp: 24,
    condition: "Rainy",
    code: 61,
  });

  /* =========================
     WEATHER
  ========================= */

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );

        if (!response.ok) {
          throw new Error("Weather request failed");
        }

        const data = await response.json();

        if (data.current_weather) {
          const code = data.current_weather.weathercode;

          setWeather({
            temp: Math.round(
              data.current_weather.temperature
            ),
            condition: getWeatherCondition(code),
            code,
          });
        }
      } catch (error) {
        console.error(
          "Gagal mengambil data cuaca:",
          error
        );
      }
    };

    fetchWeather();

    const weatherInterval = setInterval(
      fetchWeather,
      15 * 60 * 1000
    );

    return () => {
      clearInterval(weatherInterval);
    };
  }, [latitude, longitude]);

  /* =========================
     WEATHER CONDITION
  ========================= */

  const getWeatherCondition = (
    code: number
  ): string => {
    if (code === 0) return "Sunny";

    if (code >= 1 && code <= 3) {
      return "Cloudy";
    }

    if (code >= 51 && code <= 67) {
      return "Rainy";
    }

    if (code >= 71 && code <= 77) {
      return "Snowy";
    }

    if (code >= 95) {
      return "Stormy";
    }

    return "Rainy";
  };

  /* =========================
     WEATHER ICON
  ========================= */

  const renderWeatherIcon = (
    code: number
  ) => {
    const iconClass =
      "w-7 h-7 text-indigo-400 fill-indigo-200";

    if (code === 0) {
      return (
        <Sun
          className="w-7 h-7 text-amber-500 fill-amber-200"
        />
      );
    }

    if (code >= 1 && code <= 3) {
      return (
        <Cloud
          className="w-7 h-7 text-slate-400 fill-slate-200"
        />
      );
    }

    if (code >= 71 && code <= 77) {
      return (
        <CloudSnow className={iconClass} />
      );
    }

    if (code >= 95) {
      return (
        <CloudLightning className={iconClass} />
      );
    }

    return (
      <CloudRain className={iconClass} />
    );
  };

  /* =========================
     BUTTON STYLE
  ========================= */

  const transitionClass =
    "transition-all duration-100 ease-in-out";

  const pressAnimationClass =
    "active:shadow-none active:translate-x-[2px] active:translate-y-[2px]";

  const buttonBaseClass = `
    flex
    bg-[#fcf8ed]
    border-2
    border-black
    rounded-xl
    shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
    hover:bg-[#f5eedc]
    cursor-pointer
    ${transitionClass}
    ${pressAnimationClass}
  `;

  return (
    <header
      className={`
        flex
        justify-end
        items-center
        p-6
        z-50
        ${className}
      `}
    >
      {/* =========================
          LOGO
      ========================= */}

      {!isStandaloneWidgets && (
        <div className="flex flex-col mr-auto">
          <h1 className="text-2xl font-black text-black">
            DESKSCAPE
          </h1>
        </div>
      )}

      {/* =========================
          WEATHER ONLY
      ========================= */}

      <div className="flex items-center">
        <button
          type="button"
          aria-label="Current weather"
          className={`
            items-center
            gap-2
            px-3
            py-1.5
            ${buttonBaseClass}
          `}
        >
          {renderWeatherIcon(weather.code)}

          <div className="flex flex-col leading-tight text-left">
            <span className="text-sm font-bold text-black">
              {weather.temp}°C
            </span>

            <span className="text-xs text-gray-600 font-medium">
              {weather.condition}
            </span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Navbar;