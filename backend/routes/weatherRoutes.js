import express from "express";
import axios from "axios";
import History from "../models/History.js";
import dotenv from "dotenv";
import { encode } from "querystring"; // To handle URL encoding

dotenv.config();

const router = express.Router();

// Fetch weather data from OpenWeather API
router.get("/weather/:city", async (req, res) => {
  const { city } = req.params;
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({ error: "City name is required" });
  }

  try {
    // Ensure the city name is properly encoded
    const encodedCity = encode(city);
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`
    );

    const data = response.data;

    const weatherData = {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind_speed: data.wind.speed,
      wind_direction: data.wind.deg,
      cloudiness: data.clouds.all,
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      weather_condition: data.weather[0].description,
      weather_icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
      rain_1h: data.rain ? data.rain["1h"] : 0,
      snow_1h: data.snow ? data.snow["1h"] : 0,
    };

    // Save to MongoDB
    await History.create(weatherData);

    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Get search history
router.get("/history", async (req, res) => {
  try {
    const history = await History.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    console.error("Error fetching history:", error.message);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// Clear search history
router.delete("/history", async (req, res) => {
  try {
    await History.deleteMany({}); // Deletes all history records
    res.status(200).json({ message: "Search history cleared successfully" });
  } catch (error) {
    console.error("Error clearing history:", error.message);
    res.status(500).json({ error: "Failed to clear history" });
  }
});

export default router;
