import { useState, useEffect } from "react"
import { useWeather } from "../Context/WeatherContext";

export default function SearchBar() {
    const [city, setCity] = useState("");
    const { userLocation, updateLocation, isLoading, searchError } = useWeather();

    useEffect(() => {
        if (userLocation?.province) {
            setCity(userLocation.province);
            updateLocation(userLocation.province);
        }
    }, [userLocation]);

    const handleChange = (event) => {
        setCity(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (city.trim()) {
            updateLocation(city);
        }
    } 

    return (
        <div className="relative flex flex-col items-end">
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                    <input 
                        value={city} 
                        onChange={handleChange} 
                        placeholder="Enter city name ..." 
                        className={`border ${searchError ? 'border-red-500' : 'border-[#373A70]'} rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[300px]`}
                    />
                    {isLoading && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#373A70]"></div>
                        </div>
                    )}
                </div>
            </form>
            {searchError && (
                <div className="absolute top-full mt-1 right-0 bg-red-50 text-red-500 text-sm py-1 px-3 rounded-lg border border-red-200">
                    {searchError}
                </div>
            )}
        </div>
    )
}