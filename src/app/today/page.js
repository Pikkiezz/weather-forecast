"use client"

import { useWeather } from "../Context/WeatherContext";

export default function TodayPage() {
  const { location } = useWeather();
  console.log('Raw Location Data:', location);
  console.log('Location Type:', typeof location);
  
  // Add more detailed validation
  if (!location) {
    console.log('No location data available');
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-xl text-gray-500">Please search for a city to view weather details</p>
      </div>
    );
  }

  // Check if location data is in the correct format
  if (!location.hourly || !location.hourly.temperature_2m || !location.hourly.time) {
    console.log('Invalid location data structure:', location);
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-xl text-gray-500">Invalid weather data format</p>
      </div>
    );
  }

  try {
    // Get current hour's data
    const currentHourIndex = new Date().getHours();
    console.log('Current Hour Index:', currentHourIndex);
    
    const currentTemp = location.hourly.temperature_2m[currentHourIndex];
    console.log('Current Temperature:', currentTemp);
    
    // Get today's min and max temperature
    const todayTemps = location.hourly.temperature_2m.slice(0, 24);
    console.log('Today Temperatures:', todayTemps);
    
    const maxTemp = Math.max(...todayTemps);
    const minTemp = Math.min(...todayTemps);
    console.log('Max Temp:', maxTemp, 'Min Temp:', minTemp);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Current Weather Details */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-[#373A70]">Current Weather Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Current Temperature</span>
                <span className="font-semibold">{currentTemp?.toFixed(1) || 'N/A'}°C</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Today's Max Temperature</span>
                <span className="font-semibold">{maxTemp?.toFixed(1) || 'N/A'}°C</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Today's Min Temperature</span>
                <span className="font-semibold">{minTemp?.toFixed(1) || 'N/A'}°C</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Elevation</span>
                <span className="font-semibold">{location.elevation?.toFixed(1) || 'N/A'} m</span>
              </div>
            </div>
          </div>

          {/* Right Column - Location Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-[#373A70]">Location Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">Latitude</span>
                  <span className="font-semibold">{location.latitude?.toFixed(4) || 'N/A'}°</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">Longitude</span>
                  <span className="font-semibold">{location.longitude?.toFixed(4) || 'N/A'}°</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">Timezone</span>
                  <span className="font-semibold">{location.timezone || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">UTC Offset</span>
                  <span className="font-semibold">{(location.utc_offset_seconds / 3600) || 'N/A'} hours</span>
                </div>
              </div>
            </div>

            {/* Hourly Forecast */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-[#373A70]">Next Hours Forecast</h2>
              <div className="space-y-4">
                {location.hourly.time.slice(currentHourIndex, currentHourIndex + 6).map((time, index) => {
                  const temp = location.hourly.temperature_2m[currentHourIndex + index];
                  return (
                    <div key={time} className="flex justify-between items-center border-b pb-2">
                      <span className="text-gray-600">
                        {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="font-semibold">
                        {temp?.toFixed(1) || 'N/A'}°C
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering weather data:', error);
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-xl text-gray-500">Error displaying weather data</p>
      </div>
    );
  }
}