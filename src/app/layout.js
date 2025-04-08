"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SearchBar from "./components/SearchBar";
import fetchCityWeather from "./api/route";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import React from "react";
import { useState } from "react";
import { WeatherProvider, useWeather } from "./Context/WeatherContext";
import cloudyDay from "./svg/animated/cloudy-day-1.svg";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function LayoutContent({ children }) {
  const pathname = usePathname();
  const [clicked, setClicked] = useState(false);
  const { setLocation, userLocation } = useWeather();

  const handleSubmit = async (city) => {
    const result = await fetchCityWeather(city);
    console.log('fetch data:', result);
    setLocation(result);
  }

  const handleClick = () => {
    setClicked(!clicked);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center px-20 py-4 mb-8 w-full border-b border-gray-300">
        <div className="flex">
          <Link href="/" className="flex items-center justify-center">
            <Image src={cloudyDay} alt="cloudy-day" width={45} height={45} />
            <h1 className="text-xl font-semibold text-[#373A70] px-2">Weather Forecast</h1>
          </Link>
        </div>
        <SearchBar onSubmit={handleSubmit} />
      </header>

      <div className="grid grid-cols-4 gap-4 items-center bg-[#373A70] rounded-xl w-[900px] mx-auto h-12">
        <Link 
          href="/today" 
          className={`text-white text-sm h-full flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-blue-400/20 ${pathname === '/today' ? 'bg-blue-400/30' : ''}`}
        >
          TODAY
        </Link>
        
        <Link 
          href="/hourly" 
          className={`text-white text-sm h-full flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-blue-400/20 ${pathname === '/hourly' ? 'bg-blue-400/30' : ''}`}
        >
          HOURLY
        </Link>

        <Link 
          href="/daily" 
          className={`text-white text-sm h-full flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-blue-400/20 ${pathname === '/daily' ? 'bg-blue-400/30' : ''}`}
        >
          DAILY
        </Link>

        <Link 
          href="/airQuality" 
          className={`text-white text-sm h-full flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-blue-400/20 ${pathname === '/airQuality' ? 'bg-blue-400/30' : ''}`}
        >
          AIR QUALITY
        </Link>
      </div>
      
      <div className="flex-1">
        {children}
      </div>
      
      <div className="text-center py-4 bg-[#373A70] h-[150px]">Footer</div>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <WeatherProvider>
          <LayoutContent>
            {children}
          </LayoutContent>
        </WeatherProvider>
      </body>
    </html>
  );
}
