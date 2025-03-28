import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import HistoryList from "../components/HistoryList";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/history");
      setHistory(res.data);
    } catch (error) {
      console.error("Failed to fetch history");
    }
  };

  const clearHistory = async () => {
    try {
      await axios.delete("http://localhost:5000/api/history");
      fetchHistory(); // Fetch updated history after clearing
    } catch (error) {
      console.error("Failed to clear history", error);
    }
  };  

  return (
    <div className="min-h-screen pt-20 px-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Search History
      </h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        {history.length > 0 ? (
          <>
            {/* Pass fetched history to HistoryList */}
            <HistoryList history={history} />

            {/* Clear History Button */}
            <button
              onClick={clearHistory}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
            >
              Clear History
            </button>
          </>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 text-lg mt-4">
            No search history found. Start searching for weather updates!
          </div>
        )}
      </motion.div>
    </div>
  );
}
