"use client";

import { useWeather } from "@/app/Context/WeatherContext";
import Image from "next/image";
import Loading from "@/app/svg/loading";

export default function HourlyCard() {
    const { location, cityTime, weatherCodeMap } = useWeather();
    const hourlyData = location?.weatherData?.hourly;

    if (!hourlyData?.time) {
        return <div className="flex justify-center items-center h-full"><Loading /></div>;
    }

    
    const first24Hours = {
        time: hourlyData.time.slice(0, 24),
        temperature_2m: hourlyData.temperature_2m.slice(0, 24),
        relative_humidity_2m: hourlyData.relative_humidity_2m.slice(0, 24),
        weather_code: hourlyData.weather_code.slice(0, 24),
        wind_speed_10m: hourlyData.wind_speed_10m.slice(0, 24),
        wind_gusts_10m: hourlyData.wind_gusts_10m.slice(0, 24),
        cloud_cover: hourlyData.cloud_cover.slice(0, 24),
        visibility: hourlyData.visibility.slice(0, 24),
        precipitation_probability: hourlyData.precipitation_probability.slice(0, 24),
        
    };

    return (
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 mt-4 w-[1250px] mb-25">
            {first24Hours.time.map((timeValue, index) => (
                
                
                <div 
                    key={index} 
                    className="flex justify-center items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100 w-[550px] h-[170px] "
                >
                    {/* weather icon container */}
                    <div className=" flex flex-col justify-center items-center mr-10 w-[80px] ">
                        <div className=" justify-center items-center">
                            {weatherCodeMap[first24Hours.weather_code[index]]?.icon && (
                            <Image
                            src={weatherCodeMap[first24Hours.weather_code[index]].icon}
                            alt={weatherCodeMap[first24Hours.weather_code[index]].text}
                            width={80}
                            height={80}
                            />
                            )}
                        </div>
                        <div className="flex justify-center">
                            {weatherCodeMap[first24Hours.weather_code[index]]?.text && (
                            <div className="text-center text-gray-500 text-sm ">
                                {weatherCodeMap[first24Hours.weather_code[index]].text}
                            </div>
                        )}
                        </div>
                    </div>
                    
                     {/* detail container    */}
                    <div>
                    <div className="flex justify-between items-center">
                        <div className="text-center text-gray-600 mb-2">
                        {new Date(timeValue).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                            })}
                        </div>
                        <div className="text-xl font-semibold text-gray-800">
                            {Math.round(first24Hours.temperature_2m[index])}°C
                        </div>
                    </div>
        
                    

                    <div className="mt-2 text-sm text-gray-500 space-y-1 grid grid-cols-2">
                        <div>Humidity: {first24Hours.relative_humidity_2m[index]}%</div>
                        <div>Wind Speed: {first24Hours.wind_speed_10m[index]} m/s</div>
                        <div>Wind Gusts: {first24Hours.wind_gusts_10m[index]} m/s</div>
                        <div>Cloud Cover: {first24Hours.cloud_cover[index]}%</div>
                        <div>Visibility: {first24Hours.visibility[index]} km</div>
                        <div>Precipitation Probability: {first24Hours.precipitation_probability[index]}%</div>
                    </div>
                    </div>
                </div>
                
            ))}
        </div>
    );
}
