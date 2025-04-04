"use client";

import { useWeather } from "@/app/Context/WeatherContext";
import Image from "next/image";
export default function DailyCard() {
    const { location, cityTime, weatherCodeMap } = useWeather();
    const dailyData = location?.weatherData?.daily;

    if (!dailyData?.time) {
        return <div>Loading...</div>;
    }   

    const first7Days = {
        time: dailyData.time.slice(0, 7),
        temperature_2m_max: dailyData.temperature_2m_max.slice(0, 7),
        temperature_2m_min: dailyData.temperature_2m_min.slice(0, 7),
        weather_code: dailyData.weather_code.slice(0, 7),
        precipitation_probability_max: dailyData.precipitation_probability_max.slice(0, 7),
        wind_speed_10m_max: dailyData.wind_speed_10m_max.slice(0, 7),
        wind_gusts_10m_max: dailyData.wind_gusts_10m_max.slice(0, 7),
        relative_humidity_2m: dailyData.relative_humidity_2m?.slice(0, 7),
        cloud_cover: dailyData.cloud_cover?.slice(0, 7),
        visibility: dailyData.visibility?.slice(0, 7)
    }
    

    return (
        <div className="grid grid-cols-2 gap-x-2 gap-y-6 mt-4 w-[1050px] mb-25">
            {first7Days.time.map((timeValue, index) => (
                <div key={index} className=" flex items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100 w-[470px] h-[150px] px-8">
                    
                    {/* weather icon container */}
                    <div className=" flex flex-col justify-center items-center mr-10 w-[90px] ">
                        <div className=" justify-center items-center">
                            {weatherCodeMap[first7Days.weather_code[index]]?.icon && (
                            <Image
                            src={weatherCodeMap[first7Days.weather_code[index]].icon}
                            alt={weatherCodeMap[first7Days.weather_code[index]].text}
                            width={80}
                            height={80}
                            />
                            )}
                        </div>
                        <div className="flex justify-center">
                            {weatherCodeMap[first7Days.weather_code[index]]?.text && (
                            <div className="text-center text-gray-500 text-sm ">
                                {weatherCodeMap[first7Days.weather_code[index]].text}
                            </div>
                        )}
                        </div>
                    </div>

                    {/* detail container */}
                    <div>
                    <div className="flex justify-between items-center w-[280px]">
                        <div className="text-center text-gray-600 mb-2">
                            {new Date(timeValue).toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                        <div className="text-center text-xl font-semibold text-gray-800">
                            {Math.round(first7Days.temperature_2m_max[index])}°C
                        </div>
                    </div>

                    <div className="mt-2 text-sm text-gray-500 grid grid-cols-1 gap-y-1">
  
                        <div>Wind Speed: {first7Days.wind_speed_10m_max[index] || '--'} m/s</div>
                        <div>Wind Gusts: {first7Days.wind_gusts_10m_max[index] || '--'} m/s</div>
                        <div>Rain Chance: {first7Days.precipitation_probability_max[index] || '--'}%</div>
                    </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
