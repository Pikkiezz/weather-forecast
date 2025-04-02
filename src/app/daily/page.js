"use client";

import { useWeather } from "../Context/WeatherContext";
import DailyCard from "../components/daily/dailyCard";

export default function Daily() {
    
    const { location, cityTime } = useWeather();
    return (
        <div className="flex flex-col w-[1250px] mx-auto ">
            <div className="text-[#373A70] my-7">
                <span className="text-2xl font-bold ">Daily Weather </span> 
                <span>- {location?.geocodingData?.name} {location?.geocodingData?.country}</span> 
            </div>
            <DailyCard />
        </div>
    )
}