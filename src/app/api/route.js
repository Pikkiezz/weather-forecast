const getGeocoding = async (city) => {
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`);
  const data = await response.json();
  const { latitude, longitude, name, country } = data.results[0]; 
  console.log({ latitude, longitude, name, country });
  
  return { latitude, longitude, name, country };
};

const getWeatherData = async (latitude, longitude) => {
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,sunrise,sunset,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_gusts_10m_max,precipitation_probability_max&hourly=temperature_2m,relative_humidity_2m,visibility,weather_code,cloud_cover,wind_speed_10m,wind_gusts_10m,precipitation_probability,apparent_temperature&timezone=auto`);
  const data = await response.json();
  
  return data;
};



const fetchCityWeather = async (city) => {
  try {
    const geocodingData = await getGeocoding(city);
    if (!geocodingData) {
      throw new Error('City not found');
    }

    const {latitude, longitude} = geocodingData;

    const weatherData = await getWeatherData(latitude, longitude);
    console.log({geocodingData, weatherData});
    
    return {geocodingData, weatherData};

    
  }

  catch(error) {
    console.error('Error fetching Data:', error);
    return null;
  }

};

export default fetchCityWeather;