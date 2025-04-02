"use client";

import { useWeather } from "@/app/Context/WeatherContext";

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
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 mt-4 w-[1250px] mb-25">
            {first7Days.time.map((timeValue, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 w-[450px] h-[150px] px-8">
                    <div className="flex justify-between items-center">
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

                    <div className="mt-2 text-sm text-gray-500 grid grid-cols-2 gap-2">
                        <div>Weather: {weatherCodeMap[first7Days.weather_code[index]] || "Unknown"}</div>  
                        <div>Wind Speed: {first7Days.wind_speed_10m_max[index] || '--'} m/s</div>
                        <div>Wind Gusts: {first7Days.wind_gusts_10m_max[index] || '--'} m/s</div>
                        <div>Rain Chance: {first7Days.precipitation_probability_max[index] || '--'}%</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
