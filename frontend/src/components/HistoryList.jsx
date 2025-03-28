import { useEffect, useState } from "react";
import axios from "axios";

export default function HistoryList() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/history")
      .then(res => setHistory(res.data))
      .catch(() => console.error("Failed to fetch history"));
  }, []);

  return (
    <div className="mt-5 p-4 border rounded shadow-lg bg-white dark:bg-gray-800 transition-all w-full max-w-md">
      <h2 className="text-lg font-bold">Search History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index} className="text-sm">{item.city}, {item.country} - {item.temperature}°C</li>
        ))}
      </ul>
    </div>
  );
}
