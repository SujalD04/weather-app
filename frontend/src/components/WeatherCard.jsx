import { useState } from "react";

export default function WeatherCard({ weather }) {
  const [unit, setUnit] = useState("C");

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  const temp = unit === "C" ? weather.temperature : (weather.temperature * 9/5) + 32;

  return (
    <div className="mt-5 p-4 border rounded shadow-lg bg-white dark:bg-gray-800 transition-all">
      <h2 className="text-xl font-bold">{weather.city}, {weather.country}</h2>
      <img src={weather.weather_icon} alt={weather.weather_condition} className="mx-auto" />
      <p className="text-lg">{weather.weather_condition}</p>
      <p className="text-2xl font-semibold">{temp.toFixed(1)}°{unit}</p>
      <p>Humidity: {weather.humidity}% | Wind: {weather.wind_speed}m/s</p>
      <p>Sunrise: {weather.sunrise} | Sunset: {weather.sunset}</p>
      <button
        className="mt-2 px-4 py-1 bg-gray-500 text-white rounded"
        onClick={toggleUnit}
      >
        Toggle °C/°F
      </button>
    </div>
  );
}
