import Image from "next/image";
import { useWeather } from "./Context/WeatherContext";
import TodayPage from "./today/page";

export default function Home() {
  return (
    <div>
      <div className="text-center mb-8 pt-10">
        <h1 className="text-4xl font-bold text-[#373A70]">Stay Ahead of the Weather</h1>
        <p className="text-lg text-gray-600">Real-time Forecasts, Accurate Data, Anytime, Anywhere.</p>
      </div>
      <TodayPage />
    </div>
  );
}
