"use client";

import { useEffect, useState } from 'react';
import { useWeather } from "../Context/WeatherContext";
import MainWeatherCard from '../components/today/mainWeatherCard';
import WeatherDetailCard from '../components/today/weatherDetailCard';
import SevenDayCard from '../components/today/SevenDayCard';
import SunDuration from '../components/today/sunDuration';
import TodayDescription from '../components/today/todayDescription';

export default function TodayPage() {
  const { location, cityTime } = useWeather();
  const [weatherData, setWeatherData] = useState({
    currentTemp: null,
    currentHumidity: null,
    currentVisibility: null,
    currentWindSpeed: null,
    currentWindGust: null,
    currentCloudCover: null
  });

  useEffect(() => {
    const updateWeatherData = () => {
      if (location?.weatherData?.hourly) {
        const currentHour = new Date().getHours();
        const newWeatherData = {
          currentTemp: location.weatherData.hourly.temperature_2m[currentHour],
          currentHumidity: location.weatherData.hourly.relative_humidity_2m?.[currentHour],
          currentVisibility: location.weatherData.hourly.visibility?.[currentHour],
          currentWindSpeed: location.weatherData.hourly.wind_speed_10m?.[currentHour],
          currentWindGust: location.weatherData.hourly.wind_gusts_10m?.[currentHour],
          currentCloudCover: location.weatherData.hourly.cloud_cover?.[currentHour]
        };
        
        setWeatherData(newWeatherData);
      }
    };

    updateWeatherData();
    const timer = setInterval(updateWeatherData, 3600000); 
    return () => clearInterval(timer);
  }, [location]);

  // if (!location) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
  //       <h1 className="text-4xl font-bold text-[#373A70]">
  //         Stay Ahead of the Weather
  //       </h1>
  //       <p className="text-xl text-gray-500">
  //         Real-time Forecasts, Accurate Data, Anytime, Anywhere.
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto px-4 py-8 w-[1000px] mb-16">
      <div className="grid grid-cols-1 gap-8">
        <div className="animate-slide-up">
          <MainWeatherCard location={location} weatherData={weatherData} cityTime={cityTime} />
        </div>
        
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="animate-slide-right">
          <WeatherDetailCard weatherData={weatherData} />
        </div>
        <div className="flex flex-col gap-8">
          <div className="animate-slide-up">
            <SunDuration />
          </div>
          <div className="animate-slide-down">
            <TodayDescription />
          </div>
        </div>
      </div>
      <div className="animate-slide-down">
        <SevenDayCard location={location} />
      </div>
    </div>
  );
}
