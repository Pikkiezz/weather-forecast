export default function WeatherDetailCard({ weatherData }) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Weather Details</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <div className="text-gray-400 text-sm">Wind</div>
            <div className="font-semibold text-base text-gray-700">{weatherData.currentWindSpeed || '--'} km/h</div>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <div className="text-gray-400 text-sm">Wind Gust</div>
            <div className="font-semibold text-base text-gray-700">{weatherData.currentWindGust || '--'} km/h</div>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <div className="text-gray-400 text-sm">Cloud Cover</div>
            <div className="font-semibold text-base text-gray-700">{weatherData.currentCloudCover || '--'}%</div>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <div className="text-gray-400 text-sm">Visibility</div>
            <div className="font-semibold text-base text-gray-700">
              {weatherData.currentVisibility ? (weatherData.currentVisibility / 1000).toFixed(1) : '--'} km
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-400 text-sm">Humidity</div>
            <div className="font-semibold text-base text-gray-700">{weatherData.currentHumidity || '--'}%</div>
          </div>
        </div>
      </div>
    );
  }