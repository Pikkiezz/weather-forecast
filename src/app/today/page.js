"use client";

import { useEffect, useState } from 'react';
import { useWeather } from "../Context/WeatherContext";

export default function TodayPage() {
  const { location } = useWeather();
  const [weatherData, setWeatherData] = useState({
    currentTemp: null,
    currentHumidity: null,
    currentVisibility: null,
    currentWindSpeed: null,
    currentWindGust: null,
    currentCloudCover: null
  });

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Update weather data when location changes or every hour
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

    // Initial update
    updateWeatherData();

    // Update every hour
    const timer = setInterval(updateWeatherData, 3600000); // 3600000 ms = 1 hour

    return () => clearInterval(timer);
  }, [location]);

  if (!location) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h1 className="text-4xl font-bold text-[#373A70]">
          Stay Ahead of the Weather
        </h1>
        <p className="text-xl text-gray-500">
          Real-time Forecasts, Accurate Data, Anytime, Anywhere.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 w-[1000px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Main Weather Card */}
        <div className="md:col-span-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-8 text-white">
          <div className="flex flex-col">
            <div className="flex flex-col mb-4">
              <h1 className="text-3xl font-semibold">
                {location?.geocodingData?.name}, {location?.geocodingData?.country}
              </h1>
              <div className="text-lg font-medium">
                {location?.geocodingData?.latitude?.toFixed(2)}°N, {location?.geocodingData?.longitude?.toFixed(2)}°E
              </div>
            </div>

            <div className="text-7xl font-bold">
              {weatherData.currentTemp?.toFixed(1)}°C
            </div>
          </div>
        </div>

        {/* Weather Details Container */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Weather Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <div className="text-gray-400 text-sm">Wind</div>
              <div className="font-semibold text-base text-gray-700">{weatherData.currentWindSpeed || '--'} km/h</div>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <div className="text-gray-400 text-sm">Wind Gust</div>
              <div className="font-semibold text-base text-gray-700">{weatherData.currentWindGust || '--'} km/h</div>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <div className="text-gray-400 text-sm">Cloud Cover</div>
              <div className="font-semibold text-base text-gray-700">{weatherData.currentCloudCover || '--'}%</div>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <div className="text-gray-400 text-sm">Visibility</div>
              <div className="font-semibold text-base text-gray-700">{weatherData.currentVisibility ? (weatherData.currentVisibility / 1000).toFixed(1) : '--'} km</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-400 text-sm">Humidity</div>
              <div className="font-semibold text-base text-gray-700">{weatherData.currentHumidity || '--'}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="mt-4">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">7-Day Forecast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {location?.weatherData?.daily?.time?.slice(0, 7).map((date, index) => {
              const maxTemp = location?.weatherData?.daily?.temperature_2m_max?.[index];
              const minTemp = location?.weatherData?.daily?.temperature_2m_min?.[index];
              const dateObj = new Date(date);

              return (
                <div key={date} className="bg-blue-600/30 p-3 rounded-lg">
                  <div className="text-center">
                    <div className="font-semibold text-base text-gray-700">
                      {index === 0 ? 'Today' : days[dateObj.getDay()].slice(0, 3)}
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      {dateObj.getDate()} {months[dateObj.getMonth()].slice(0, 3)}
                    </div>
                    <div className="text-xl font-bold text-gray-800">{maxTemp?.toFixed(0)}°</div>
                    <div className="text-gray-500 text-sm">{minTemp?.toFixed(0)}°</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Debug Information */}
      {/* <div className="mt-8 p-4 bg-gray-100 rounded-xl">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(location, null, 2)}
        </pre>
      </div> */}
    </div>
  );
}
