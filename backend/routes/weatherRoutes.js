import express from "express";
import axios from "axios";
import History from "../models/History.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Fetch weather data from OpenWeather API
router.get("/weather/:city", async (req, res) => {
  const { city } = req.params;
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "API key is missing. Please check your environment variables." });
  }

  if (!city) {
    return res.status(400).json({ error: "City name is required" });
  }

  try {
    // Ensure the city name is properly encoded
    const encodedCity = encodeURIComponent(city);

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`
    );

    const data = response.data;

    // Construct weather data object
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

    // Return weather data to the client
    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error.response ? error.response.data : error.message);

    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: "City not found. Please check the city name." });
    }

    res.status(500).json({ error: "Failed to fetch weather data. Please try again later." });
  }
});

// Get search history
router.get("/history", async (req, res) => {
  try {
    const history = await History.find().sort({ createdAt: -1 }); // Sort by creation time, most recent first
    if (!history || history.length === 0) {
      return res.status(404).json({ message: "No search history found." });
    }
    res.json(history);
  } catch (error) {
    console.error("Error fetching history:", error.message);
    res.status(500).json({ error: "Failed to fetch history. Please try again later." });
  }
});

// Clear search history
router.delete("/history", async (req, res) => {
  try {
    const result = await History.deleteMany({}); // Deletes all history records
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No history records to clear." });
    }
    res.status(200).json({ message: "Search history cleared successfully" });
  } catch (error) {
    console.error("Error clearing history:", error.message);
    res.status(500).json({ error: "Failed to clear history. Please try again later." });
  }
});

export default router;
