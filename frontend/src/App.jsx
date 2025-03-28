import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ThemeToggle from "./components/ThemeToggle";
import HistoryList from "./components/HistoryList";

export default function App() {
  const [weather, setWeather] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <ThemeToggle />
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <SearchBar setWeather={setWeather} />
      {weather && <WeatherCard weather={weather} />}
      <HistoryList />
    </div>
  );
}
