"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { getAirQualityLevel } from './airQualityMap';
import fetchCityWeather from '../api/route';

import cloudyDayOne from '../svg/animated/cloudy-day-1.svg';
import cloudyDayTwo from '../svg/animated/cloudy-day-2.svg';
import cloudyDayThree from '../svg/animated/cloudy-day-3.svg';
import cloudy from '../svg/animated/cloudy.svg';
import day from '../svg/animated/day.svg';
import night from '../svg/animated/night.svg';
import rainyFour from '../svg/animated/rainy-4.svg';
import rainyFive from '../svg/animated/rainy-5.svg';
import rainySix from '../svg/animated/rainy-6.svg';
import rainySeven from '../svg/animated/rainy-7.svg';
import snowyFour from '../svg/animated/snowy-4.svg';
import snowyFive from '../svg/animated/snowy-5.svg';
import snowySix from '../svg/animated/snowy-6.svg';
import thunder from '../svg/animated/thunder.svg';



export const weatherCodeMap = {
    0: {text: "Clear sky", icon: day},
    1: {text: "Mainly clear", icon: cloudyDayOne},
    2: {text: "Partly cloudy", icon: cloudyDayTwo},
    3: {text: "Overcast", icon: cloudyDayThree},
    45: {text: "Foggy", icon: cloudy},
    48: {text: "Depositing rime fog", icon: cloudy},
    51: {text: "Light drizzle", icon: rainyFour},
    53: {text: "Moderate drizzle", icon: rainyFive},
    55: {text: "Dense drizzle", icon: rainySix},
    56: {text: "Light freezing drizzle", icon: snowyFour},
    57: {text: "Dense freezing drizzle", icon: snowyFive},
    61: {text: "Slight rain", icon: rainyFour},
    63: {text: "Moderate rain", icon: rainyFive},
    65: {text: "Heavy rain", icon: rainySeven},
    66: {text: "Light freezing rain", icon: snowyFour},
    67: {text: "Heavy freezing rain", icon: snowySix},
    71: {text: "Slight snow fall", icon: snowyFour},
    73: {text: "Moderate snow fall", icon: snowyFive},
    75: {text: "Heavy snow fall", icon: snowySix},
    77: {text: "Snow grains", icon: snowyFour},
    80: {text: "Slight rain showers", icon: rainySix},
    81: {text: "Moderate rain showers", icon: rainySeven},
    82: {text: "Violent rain showers", icon: rainySeven},
    85: {text: "Slight snow showers", icon: snowySix},
    86: {text: "Heavy snow showers", icon: snowySix},
    95: {text: "Thunderstorm", icon: thunder},
    96: {text: "Thunderstorm with slight hail", icon: thunder},
    99: {text: "Thunderstorm with heavy hail", icon: thunder},
    
};

// ---------------ดึงipที่อยู่ของuser--------------------------------

const WeatherContext = createContext();

const fetchIpData = async () => {
  try {
    const response = await fetch('https://api.db-ip.com/v2/free/self');
    if (!response.ok) {
      throw new Error('Failed to fetch IP data');
    }
    const data = await response.json();
    
    console.log('IP API Response:', data);
    localStorage.setItem('ipAddress', JSON.stringify(data));
    
    return {
      ip: data.ipAddress,
      city: data.city,
      province: data.stateProv,
      country: data.countryName
    };
  } catch (error) {
    console.error('Error fetching IP:', error);
    return null;
  }
};

export function WeatherProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [cityTime, setCityTime] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateLocation = async (city) => {
    try {
      setIsLoading(true);
      setSearchError(null);

      // Check if city exists
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
      const result = await response.json();

      if (!result.results || result.results.length === 0) {
        setSearchError("City not found");
        setLocation(null);
        localStorage.removeItem('lastSearch');
        return;
      }

      const weatherData = await fetchCityWeather(city);
      
      if (!weatherData) {
        setSearchError("Failed to fetch weather data");
        setLocation(null);
        localStorage.removeItem('lastSearch');
        return;
      }

      setLocation(weatherData);
      localStorage.setItem('lastSearch', JSON.stringify(weatherData));

      // Update time if timezone exists
      if (weatherData.weatherData?.timezone) {
        const localTime = new Date().toLocaleString('en-US', { timeZone: weatherData.weatherData.timezone });
        setCityTime(localTime);
      }
    } catch (error) {
      console.error('Error updating location:', error);
      setSearchError("An error occurred while fetching weather data");
      setLocation(null);
      localStorage.removeItem('lastSearch');
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------ดึงข้อมูลตอนผู้ใช้เข้ามา----------------------

  useEffect(() => {
    const initializeData = async () => {
      const lastSearch = localStorage.getItem('lastSearch');
      
      if (lastSearch) {
        console.log('Using last searched location');
        const data = JSON.parse(lastSearch);
        updateLocation(data.city);
      } else {
        const ipData = await fetchIpData();
        
        if (ipData) {
          setUserLocation({
            city: ipData.city,
            province: ipData.province,
            country: ipData.country
          });    
        }
      }
    };

    initializeData();
  }, []);
  
  //--------------------------------อัพเดทเวลาทุกวินาที--------------------------------

  useEffect(() => {
    if (location?.weatherData?.timezone) {
      const timer = setInterval(() => {
        const newTime = new Date().toLocaleString('en-US', {
          timeZone: location.weatherData.timezone,
          hour12: false
        });
        setCityTime(newTime);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [location]);

  return (
    <WeatherContext.Provider value={{ 
      location, 
      cityTime, 
      userLocation, 
      updateLocation,
      searchError,
      setSearchError,
      isLoading,
      weatherCodeMap,
      getAirQualityLevel
    }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}