import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function SearchBar({ setWeather }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ref to track the search bar and suggestions dropdown
  const searchBarRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Debounced fetch for suggestions
  useEffect(() => {
    if (!city || city.length < 2) {  // Check for empty or very short input
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true); 
      try {
        const res = await axios.get("https://api.openweathermap.org/data/2.5/find", {
          params: {
            q: city,
            type: "like",
            sort: "population",
            cnt: 5, // Limit to top 5 results
            appid: import.meta.env.VITE_OPENWEATHER_API_KEY, // Correct access to the environment variable
          },
        });
        setSuggestions(res.data.list);
      } catch (error) {
        console.error("Error fetching city suggestions", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 300); // Debounce 300ms after typing

    return () => clearTimeout(debounceTimeout);
  }, [city]);

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    try {
      const res = await axios.get(`https://weather-app-p1y5.onrender.com/api/weather/${cityName}`);
      setWeather(res.data);
    } catch (error) {
      console.error("Error fetching weather", error);
      alert("City not found or API issue");
    }
  };

  const handleClickAway = (event) => {
    if (
      searchBarRef.current && !searchBarRef.current.contains(event.target) &&
      suggestionsRef.current && !suggestionsRef.current.contains(event.target)
    ) {
      setSuggestions([]); // Hide suggestions
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickAway);

    return () => {
      document.removeEventListener("click", handleClickAway);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto" ref={searchBarRef}>
      {/* Search Bar */}
      <div className="flex justify-center gap-2">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => fetchWeather(city)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div
          className="absolute w-full text-black bg-white shadow-lg rounded-lg mt-2 z-10"
          ref={suggestionsRef}
        >
          {loading ? (
            <div className="p-2 text-center">Loading...</div>
          ) : (
            suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                onClick={() => {
                  setCity(suggestion.name);
                  fetchWeather(suggestion.name);
                  setSuggestions([]); // Close the dropdown after selecting
                }}
                className="cursor-pointer p-2 text-black hover:bg-gray-100"
              >
                {suggestion.name}, {suggestion.sys.country}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
