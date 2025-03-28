import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  const [weather, setWeather] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <ThemeToggle />
      <SearchBar setWeather={setWeather} />
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}
