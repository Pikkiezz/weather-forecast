import { useWeather } from "../../Context/WeatherContext";
import day from "../../svg/animated/day.svg";
import night from "../../svg/animated/night.svg";
import Image from "next/image";

export default function SunDuration() {
  const { location } = useWeather();
  return (
    <div className="flex w-full bg-white rounded-xl h-[100px] shadow-lg overflow-hidden">
      <div className="flex w-1/2 justify-center items-center ">
        <Image src={day} alt="day" width={100} height={100} />
        <div className="flex flex-col w-1/2 justify-center items-center pr-2">
          <p className="text-xl font-bold text-[#373A70]">Sunrise</p>
          <p className="text-md font-light text-[#373A70]">
            {location.weatherData.daily.sunrise[0].split("T")[1]} a.m.
          </p>
        </div>
      </div>

      <div className="flex w-1/2 justify-center items-center bg-[#373A70]">
        <Image src={night} alt="night" width={100} height={100} />
        <div className="flex flex-col w-1/2 justify-center items-center pr-2">
          <p className="text-xl font-bold text-white">Sunset</p>
          <p className="text-md font-light text-white">
            {location.weatherData.daily.sunset[0].split("T")[1]} p.m.
          </p>
        </div>
      </div>
    </div>
  );
}
