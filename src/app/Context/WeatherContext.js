"use client";

import { createContext, useContext, useState, useEffect } from 'react';

export const weatherCodeMap = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
};

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [cityTime, setCityTime] = useState(null);
  const [cityCurrentHour, setCityCurrentHour] = useState(null);

  const updateLocation = (data) => {
    setLocation(data);

    if (data?.weatherData?.timezone) {
      const localTime = new Date().toLocaleString('en-US', {
        timeZone: data.weatherData.timezone,
        hour12: false
      });
      
      console.log('Timezone:', data.weatherData.timezone);
      console.log('Local Time:', localTime);
      console.log('Current Hour:', new Date(localTime).getHours());
      
      setCityTime(localTime);
      setCityCurrentHour(new Date(localTime).getHours());
    }
  };

  // อัพเดทเวลาทุกนาที
  useEffect(() => {
    if (location?.weatherData?.timezone) {
      const timer = setInterval(() => {
        const newTime = new Date().toLocaleString('en-US', {
          timeZone: location.weatherData.timezone,
          hour12: false
        });
        
        console.log('Updated Time:', newTime);
        console.log('Updated Hour:', new Date(newTime).getHours());
        
        setCityTime(newTime);
        setCityCurrentHour(new Date(newTime).getHours());
      }, 60000);

      return () => clearInterval(timer);
    }
  }, [location]);
  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocation = localStorage.getItem('weatherData');
      if (savedLocation) {
        const data = JSON.parse(savedLocation);
        updateLocation(data);  // ใช้ updateLocation แทน setLocation
      }
    }
  }, []);

  
  useEffect(() => {
    if (typeof window !== 'undefined' && location) {
      localStorage.setItem('weatherData', JSON.stringify(location));
    }
  }, [location]);



  return (
    <WeatherContext.Provider value={{ 
      location, 
      setLocation: updateLocation, 
      cityTime, 
      cityCurrentHour,
      weatherCodeMap
    }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
}