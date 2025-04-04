export default function SevenDayCard({ location }) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    return (
      <div className="mt-4">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">7-Day Forecast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {location?.weatherData?.daily?.time?.slice(0, 7).map((date, index) => {
              const maxTemp = location?.weatherData?.daily?.temperature_2m_max?.[index];
              const minTemp = location?.weatherData?.daily?.temperature_2m_min?.[index];
              const dateObj = new Date(date);
  
              return (
                <div key={date} className="bg-blue-600/30 p-3 rounded-lg">
                  <div className="text-center">
                    <div className="font-semibold text-base text-gray-700">
                      {index === 0 ? 'Today' : days[dateObj.getDay()].slice(0, 3)}
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      {dateObj.getDate()} {months[dateObj.getMonth()].slice(0, 3)}
                    </div>
                    <div className="text-xl font-bold text-gray-800">{maxTemp?.toFixed(0)}°</div>
                    <div className="text-gray-500 text-sm">{minTemp?.toFixed(0)}°</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }