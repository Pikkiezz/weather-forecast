import { useWeather } from "../../Context/WeatherContext";

export default function TodayDescription() {
    const { location, weatherCodeMap } = useWeather();
    if (!location) {
        return (
            <div className="flex flex-col shadow-lg rounded-xl p-6 w-full">
            <h1 className="text-2xl font-bold text-[#373A70] pb-2">Today's Weather</h1>
            <p className="text-md text-[#373A70]">
            Weather today in <span className="font-bold"> -- </span> will be --. 
            The daytime temperature is going to reach <span className="font-bold"> -- </span> 
            and the temperature is going to dip to <span className="font-bold"> -- </span> at night. 
            The precipitation probability is <span className="font-bold"> -- </span>.
            </p>
        </div>
        )
    }
    const dailyData = location?.weatherData?.daily;
    return (
        <div className="flex flex-col shadow-lg rounded-xl p-6 w-full">
            <h1 className="text-2xl font-bold text-[#373A70] pb-2">Today's Weather</h1>
            <p className="text-md text-[#373A70]">
            Weather today in <span className="font-bold">{location?.geocodingData?.name}</span> will be {weatherCodeMap[dailyData.weather_code[0]].text}. 
            The daytime temperature is going to reach <span className="font-bold">{dailyData.temperature_2m_max[0]}°c</span> 
            and the temperature is going to dip to <span className="font-bold">{dailyData.temperature_2m_min[0]} °c</span> at night. 
            The precipitation probability is <span className="font-bold">{dailyData.precipitation_probability_max[0]}%</span>.
            </p>
        </div>
    );
}
