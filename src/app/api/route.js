const getGeocoding = async (city) => {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`)
    const data = await response.json();
    const { latitude, longitude } = data.results[0]; 
    console.log({ latitude, longitude });
    
    return { latitude, longitude };
}

const getWeatherData = async (latitude, longitude) => {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`)
    const data = await response.json();
    
    return data
}

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
        return null
    }
}

export default fetchCityWeather;