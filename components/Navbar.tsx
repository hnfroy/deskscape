import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, Cloud, CloudLightning, CloudSnow, Menu } from 'lucide-react';

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

const Navbar: React.FC<NavbarProps & { isStandaloneWidgets?: boolean }> = ({
  className = '', 
  latitude = -6.2088, 
  longitude = 106.8456,
  isStandaloneWidgets = false
}) => {
  const [time, setTime] = useState<Date>(new Date());
  const [weather, setWeather] = useState<WeatherData>({
    temp: 24,
    condition: 'Rainy',
    code: 61,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const data = await response.json();
        
        if (data.current_weather) {
          const code = data.current_weather.weathercode;
          setWeather({
            temp: Math.round(data.current_weather.temperature),
            condition: getWeatherCondition(code),
            code: code,
          });
        }
      } catch (error) {
        console.error('Gagal mengambil data cuaca:', error);
      }
    };

    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(weatherInterval);
  }, [latitude, longitude]);

  const getWeatherCondition = (code: number): string => {
    if (code === 0) return 'Sunny';
    if (code >= 1 && code <= 3) return 'Cloudy';
    if (code >= 51 && code <= 67) return 'Rainy';
    if (code >= 71 && code <= 77) return 'Snowy';
    if (code >= 95) return 'Stormy';
    return 'Rainy';
  };

  const renderWeatherIcon = (code: number) => {
    const iconClass = "w-7 h-7 text-indigo-400 fill-indigo-200";
    if (code === 0) return <Sun className="w-7 h-7 text-amber-500 fill-amber-200" />;
    if (code >= 1 && code <= 3) return <Cloud className="w-7 h-7 text-slate-400 fill-slate-200" />;
    if (code >= 71 && code <= 77) return <CloudSnow className={iconClass} />;
    if (code >= 95) return <CloudLightning className={iconClass} />;
    return <CloudRain className={iconClass} />;
  };

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  const [timeString, period] = formattedTime.split(' ');

  const transitionClass = "transition-all duration-100 ease-in-out";
  
  const pressAnimationClass = "active:shadow-none active:translate-x-[2px] active:translate-y-[2px]";

  const buttonBaseClass = `flex bg-[#fcf8ed] border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#f5eedc] cursor-pointer ${transitionClass} ${pressAnimationClass}`;

  return (  
    <header className={`flex justify-end items-center p-6 z-50 ${className}`}>
      {!isStandaloneWidgets && (
        <div className="flex flex-col mr-auto">
          <h1 className="text-2xl font-black text-black">DESKSCAPE</h1>
        </div>
      )}

      {/* Sisi Kanan: Widget Cuaca, Waktu, & Menu Button */}
      <div className="flex items-center gap-3">
         <button 
          type="button"
          aria-label="View detailed weather"
          className={`items-center gap-2 px-3 py-1.5 ${buttonBaseClass}`}
        >
          {renderWeatherIcon(weather.code)}
          <div className="flex flex-col leading-tight text-left">
            <span className="text-sm font-bold text-black">{weather.temp}°C</span>
            <span className="text-xs text-gray-600 font-medium">{weather.condition}</span>
          </div>
        </button>

        <button 
          type="button"
          aria-label="View calendar"
          className={`flex-col items-center justify-center px-3 py-1.5 min-w-[90px] ${buttonBaseClass}`}
        >
          <span className="text-sm font-bold text-black leading-none">
            {timeString} <span className="text-xs">{period}</span>
          </span>
          <span className="text-xs text-gray-600 font-medium mt-0.5">
            {formattedDate}
          </span>
        </button>

        <button 
          type="button"
          aria-label="Open Menu"
          className={`items-center justify-center p-2.5 ${buttonBaseClass}`}
        >
          <Menu className="w-6 h-6 text-black stroke-[2]" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;