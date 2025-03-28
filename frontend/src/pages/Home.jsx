import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ThemeToggle from "../components/ThemeToggle";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = process.env.VITE_OPENWEATHER_API_KEY;
  
  const fetchLocationWeather = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        setWeather(res.data);
      } catch (err) {
        setError("Failed to fetch weather data.");
      }
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
      <ThemeToggle />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 drop-shadow-lg"
      >
        Weather App
      </motion.h1>
      
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <SearchBar setWeather={setWeather} setLoading={setLoading} setError={setError} />
        <button
          onClick={fetchLocationWeather}
          className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-lg font-bold shadow-md hover:bg-gray-200 transition-all"
        >
          <FaMapMarkerAlt /> Use My Location
        </button>
      </div>

      {loading && <p className="mt-4 text-lg">Fetching weather data...</p>}
      {error && <p className="mt-4 text-red-300">{error}</p>}

      {weather && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 w-full max-w-md"
        >
          <WeatherCard weather={weather} />
        </motion.div>
      )}
    </div>
  );
}