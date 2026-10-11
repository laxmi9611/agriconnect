const axios = require("axios");

const getWeatherByCity = async (city) => {
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey || apiKey === "your_openweathermap_api_key_here") {
    throw new Error("Weather API key not configured");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const { data } = await axios.get(url);

  return {
    city: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    windSpeed: data.wind.speed,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
  };
};

const getForecastByCity = async (city) => {
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey || apiKey === "your_openweathermap_api_key_here") {
    throw new Error("Weather API key not configured");
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const { data } = await axios.get(url);

  const daily = {};
  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!daily[date]) {
      daily[date] = {
        date,
        temps: [],
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
      };
    }
    daily[date].temps.push(item.main.temp);
  });

  return Object.values(daily)
    .slice(0, 7)
    .map((d) => ({
      date: d.date,
      minTemp: Math.round(Math.min(...d.temps)),
      maxTemp: Math.round(Math.max(...d.temps)),
      description: d.description,
      icon: d.icon,
      humidity: d.humidity,
    }));
};

module.exports = { getWeatherByCity, getForecastByCity };