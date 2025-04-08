"use client";

import { useWeather } from "@/app/Context/WeatherContext";
import { getQualityLevel } from "@/app/Context/airQualityMap";

export default function AirQualityCard() {
    const { location } = useWeather();

    
    if (!location?.airQualityData?.hourly) {
        return <div>Loading...</div>;
    }

    
    

    
    const currentAirQuality = {
        time: location.airQualityData.hourly.time?.[0] || 'N/A',
        european_aqi: location.airQualityData.hourly.european_aqi?.[0] || 'N/A',
        pm10: location.airQualityData.hourly.pm10?.[0] || 'N/A',
        pm2_5: location.airQualityData.hourly.pm2_5?.[0] || 'N/A',
        carbon_monoxide: location.airQualityData.hourly.carbon_monoxide?.[0] || 'N/A',
    };

    const pm10Level = getQualityLevel(currentAirQuality.pm10, 'pm10');
    const pm25Level = getQualityLevel(currentAirQuality.pm2_5, 'pm2_5');
    const coLevel = getQualityLevel(currentAirQuality.carbon_monoxide, 'carbon_monoxide');

    return (
        <div>
            <div className="text-lg text-[#373A70] mb-8">Current Air Quality</div>

            <div className="flex justify-center items-center gap-4">
                <div className="bg-white border border-gray-100 shadow-md p-2 rounded-lg w-[350px] h-[100px] px-4 py-2 mx-4 animate-slide-right">
                    <div className="flex flex-col justify-between h-full">
                        <div className="flex justify-center">
                            <span>PM10:</span>
                            <span>{currentAirQuality.pm10} {currentAirQuality.pm10 !== 'N/A' ? 'µg/m³' : ''}</span>
                        </div>
                        <div style={{ backgroundColor: pm10Level.color, color: 'white', textAlign: 'center', borderRadius: '10px', 
                            height: '50px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                            {pm10Level.level}
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-md border border-gray-100 p-2 rounded-lg w-[350px] h-[100px] px-4 py-2 mx-4">
                    <div className="flex flex-col justify-between h-full">
                        <div className="flex justify-center">
                            <span>PM2.5: </span>
                            <span>{currentAirQuality.pm2_5} {currentAirQuality.pm2_5 !== 'N/A' ? 'µg/m³' : ''}</span>
                        </div>
                        <div style={{ backgroundColor: pm25Level.color, color: 'white', textAlign: 'center', borderRadius: '10px', 
                            height: '50px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                            {pm25Level.level}
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-md border border-gray-100 p-2 rounded-lg w-[350px] h-[100px] px-4 py-2 mx-4 animate-slide-left">
                    <div className="flex flex-col justify-between h-full">
                        <div className="flex justify-center">
                            <span>Carbon Monoxide: </span>
                            <span>{currentAirQuality.carbon_monoxide} {currentAirQuality.carbon_monoxide !== 'N/A' ? 'mg/m³' : ''}</span>
                        </div>
                        <div style={{ backgroundColor: coLevel.color, color: 'white', textAlign: 'center', borderRadius: '10px', 
                            height: '50px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                            {coLevel.level}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
