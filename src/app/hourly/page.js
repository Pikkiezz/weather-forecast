"use client";

import { useWeather } from "../Context/WeatherContext";
import HourlyCard from "../components/hourly/hourlyCard";
import HourlyChart from "../components/hourly/hourlyChart";
export default function Hourly() {
    const { location, cityTime } = useWeather();
    return (
        <div className="flex flex-col w-[1250px] mx-auto ">
            <div className="text-[#373A70] my-7">
                <span className="text-2xl font-bold ">Hourly Weather </span> 
                <span>- {location?.geocodingData?.name} {location?.geocodingData?.country}</span> 
            </div>
            <HourlyChart />
         
            <HourlyCard />
        </div>
    )
}