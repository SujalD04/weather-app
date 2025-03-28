import { useState } from "react";
import axios from "axios";

export default function SearchBar({ setWeather }) {
  const [city, setCity] = useState("");

  const fetchWeather = async (city) => {
    if (!city) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/weather/${city}`);
      setWeather(res.data);
    } catch {
      alert("City not found or API issue");
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 rounded border text-black"
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
