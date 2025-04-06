"use client";

import { useWeather } from "../Context/WeatherContext";
import DailyCard from "../components/daily/dailyCard";
import DailyChart from "../components/daily/dailyChart";

export default function Daily() {
    
    const { location, cityTime } = useWeather();
    return (
        <div className="flex flex-col w-[1250px] mx-auto ">
            
            <div className="text-[#373A70] my-7">
                <span className="text-2xl font-bold ">Daily Weather </span> 
                <span>- {location?.geocodingData?.name} {location?.geocodingData?.country} {cityTime}</span> 
            </div>

            <div className="flex justify-center w-full">
                <div className="w-full max-w-[1000px] animate-slide-up">
                    <DailyChart />
                </div>
            </div >

            <div className="flex justify-center items-center my-10 animate-slide-down">
                <DailyCard />
            </div>
            
        </div>
    )
}