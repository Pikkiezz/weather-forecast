export default function MainWeatherCard({ location, weatherData, cityTime }) {
      if (!location) {
        return (
          <div className="md:col-span-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-8 text-white">
            <div className="flex flex-col">
              <div className="flex flex-col mb-4">
            <div className="flex justify-between text-3xl font-semibold">
              <div>
                loading...</div>
                <span className="text-sm font-light">loading...</span>
              </div>
            <div className="text-lg font-medium">
              loading...
            </div>
          </div>
  
          <div className="text-7xl font-bold">
            loading...
          </div>
        </div>
      </div>
        )
      }

        return (
          <div className="md:col-span-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-8 text-white">
            <div className="flex flex-col">
              <div className="flex flex-col mb-4">
            <div className="flex justify-between text-3xl font-semibold">
              <div>
                {location?.geocodingData?.name}, {location?.geocodingData?.country}</div>
                <span className="text-sm font-light">{cityTime}</span>
              </div>
            <div className="text-lg font-medium">
              {location?.geocodingData?.latitude?.toFixed(2)}°N, {location?.geocodingData?.longitude?.toFixed(2)}°E
            </div>
          </div>
  
          <div className="text-7xl font-bold">
            {weatherData.currentTemp?.toFixed(1)}°C
          </div>
        </div>
      </div>
    );
  }