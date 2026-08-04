"use client";

import React, { useEffect, useState } from "react";
import { Droplets, Thermometer } from "lucide-react";
import { asset } from "@/lib/path";

interface TempHumidityMeterProps {
  temperature?: number;
  humidity?: number;
  latitude?: number;
  longitude?: number;
  className?: string;
}

interface WeatherData {
  temperature: number;
  humidity: number;
}

const TempHumidityMeter: React.FC<
  TempHumidityMeterProps
> = ({
  temperature = 24,
  humidity = 68,
  latitude = -6.2088,
  longitude = 106.8456,
  className = "",
}) => {
  const [weather, setWeather] =
    useState<WeatherData>({
      temperature,
      humidity,
    });

  useEffect(() => {
    let isMounted = true;

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Weather request failed"
          );
        }

        const data = await response.json();

        if (
          isMounted &&
          data.current
        ) {
          setWeather({
            temperature: Math.round(
              data.current.temperature_2m
            ),
            humidity: Math.round(
              data.current.relative_humidity_2m
            ),
          });
        }
      } catch (error) {
        console.error(
          "Gagal mengambil data temperature & humidity:",
          error
        );
      }
    };

    fetchWeather();

    const weatherInterval =
      setInterval(
        fetchWeather,
        15 * 60 * 1000
      );

    return () => {
      isMounted = false;
      clearInterval(weatherInterval);
    };
  }, [latitude, longitude]);

  return (
    <div
      className={`
        relative
        h-full
        w-full
        select-none
        ${className}
      `}
    >
      {/* =========================
          DEVICE BODY
      ========================= */}

      <img
        src={asset(
          "/wall/temp-humidity-meter.svg"
        )}
        alt="Temperature and humidity meter"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-contain
        "
        draggable={false}
      />

      {/* =========================
          LCD CONTENT
      ========================= */}

      <div
        className="
          absolute
          left-[16%]
          top-[10%]
          h-[68%]
          w-[72%]
          overflow-hidden
        "
      >
        <div
          className="
            flex
            h-full
            w-full
            flex-col
            justify-center
            gap-[7%]
            px-[7%]
          "
        >
          {/* =========================
              TEMPERATURE
          ========================= */}

          <div
            className="
              flex
              w-full
              items-center
              gap-[8%]
            "
          >
            {/* ICON */}

            <div
              className="
                flex
                shrink-0
                items-center
                justify-center
              "
            >
              <Thermometer
                className="
                  h-[24px]
                  w-[24px]
                "
                strokeWidth={2.5}
              />
            </div>

            {/* LABEL + VALUE */}

            <div
              className="
                flex
                min-w-0
                flex-col
                justify-center
              "
            >
              <span
                className="
                  text-[8px]
                  font-medium
                  leading-none
                  text-black
                "
              >
                TEMP
              </span>

              <div
                className="
                  flex
                  items-baseline
                  whitespace-nowrap
                "
              >
                <span
                  className="
                    font-mono
                    text-[22px]
                    font-medium
                    leading-[0.9]
                    tracking-[-0.07em]
                    text-black
                  "
                >
                  {weather.temperature}
                </span>

                <span
                  className="
                    ml-[3px]
                    font-mono
                    text-[14px]
                    font-medium
                    leading-none
                  "
                >
                  °C
                </span>
              </div>
            </div>
          </div>

          {/* =========================
              DIVIDER
          ========================= */}

          <div
            className="
              h-px
              w-full
              shrink-0
              bg-black/30
            "
          />

          {/* =========================
              HUMIDITY
          ========================= */}

          <div
            className="
              flex
              w-full
              items-center
              gap-[8%]
            "
          >
            {/* ICON */}

            <div
              className="
                flex
                shrink-0
                items-center
                justify-center
              "
            >
              <Droplets
                className="
                  h-[24px]
                  w-[24px]
                "
                strokeWidth={2.5}
              />
            </div>

            {/* LABEL + VALUE */}

            <div
              className="
                flex
                min-w-0
                flex-col
                justify-center
              "
            >
              <span
                className="
                  text-[8px]
                  font-medium
                  leading-none
                  text-black
                "
              >
                Humidity
              </span>

              <div
                className="
                  flex
                  items-baseline
                  whitespace-nowrap
                "
              >
                <span
                  className="
                    font-mono
                    text-[22px]
                    font-medium
                    leading-[0.9]
                    tracking-[-0.07em]
                    text-black
                  "
                >
                  {weather.humidity}
                </span>

                <span
                  className="
                    ml-[2px]
                    font-mono
                    text-[14px]
                    font-medium
                    leading-none
                  "
                >
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempHumidityMeter;