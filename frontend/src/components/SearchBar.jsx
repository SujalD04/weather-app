import { useState, useEffect } from "react";

export default function SearchBar({ setWeather }) {
  const [city, setCity] = useState("");

  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) fetchWeather(lastCity);
  }, []);

  const fetchWeather = async (cityName) => {
    if (!cityName) return; // Prevent empty search
    localStorage.setItem("lastCity", cityName);
    try {
      const res = await fetch(`http://localhost:5000/api/weather/${cityName}`);
      const data = await res.json();
      setWeather(data);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 rounded border"
      />
      <button
        onClick={() => fetchWeather(city)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}
