"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SearchBar from "./components/SearchBar";
import fetchCityWeather from "./api/route";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { WeatherProvider, useWeather } from "./Context/WeatherContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



function LayoutContent({ children }) {
  const [clicked, setClicked] = useState(false)
  const { setLocation } = useWeather();

  const handleSubmit = async (city) => {
    const result = await fetchCityWeather(city)
    console.log('fetch data:', result);
    setLocation(result)
  }  

  const handleClick = () => {
    setClicked(!clicked)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center px-20  py-4 w-full">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-xl font-semibold text-[#373A70] px-2">Weather Forecast</h1>
          </Link>
        </div>
        <SearchBar onSubmit={handleSubmit} />
      </header>

      <div className="flex justify-around items-center px-8 py-4 bg-[#373A70] rounded-xl w-[1000px] h-[56px] mx-auto">
        <Link href="/today">
          TODAY
        </Link>
        
        <Link href="/hourly">
          HOURLY
        </Link>

        <Link href="/daily">
          DAILY
        </Link>

        <Link href="/monthly">
          MONTHLY
        </Link>

        <Link href="/airQuality">
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
