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

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const weatherData = {
      city: response.data.name,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      condition: response.data.weather[0].description,
    };

    // Save to MongoDB
    await History.create(weatherData);

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
    console.log(error);
  }
});

// Get search history
router.get("/history", async (req, res) => {
  try {
    const history = await History.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

export default router;
