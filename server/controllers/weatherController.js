const { getWeatherByCity, getForecastByCity } = require("../utils/weatherHelper");

exports.getWeather = async (req, res) => {
  try {
    const city = req.query.city || "Mumbai";
    const weather = await getWeatherByCity(city);
    res.json(weather);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getForecast = async (req, res) => {
  try {
    const city = req.query.city || "Mumbai";
    const forecast = await getForecastByCity(city);
    res.json(forecast);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};