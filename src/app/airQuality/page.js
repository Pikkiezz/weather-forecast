"use client";

import { useWeather } from "../Context/WeatherContext";
import AirQualityCard from "../components/airQuality/airQualityCard";
import PM2_5Chart from "../components/airQuality/pm2_5Chart";
import CarbonMonChart from "../components/airQuality/carbonMonChart";
import PM10Chart from "../components/airQuality/pm10Chart";
import AirDescription from "../components/airQuality/airDescription";



export default function AirQuality() {
    const { location, cityTime } = useWeather();

    return (
        <div className="flex flex-col w-[1250px] mx-auto mb-20">

            <div className="text-[#373A70] mt-7">
                <span className="text-2xl font-bold">Air Quality </span> 
                <span>- {location?.geocodingData?.name} {location?.geocodingData?.country} {cityTime}</span> 
            </div>
            
            <div className="flex justify-center items-center my-8">
                <AirQualityCard />
            </div>

            <div className="flex justify-center items-center my-8">
                <AirDescription />
            </div>

            <div className="flex justify-center w-full">
                <div className="w-full max-w-[1000px] space-y-10">
                    <PM2_5Chart />
                    <PM10Chart />
                    <CarbonMonChart />
                </div>
            </div>

        </div>
    );
}