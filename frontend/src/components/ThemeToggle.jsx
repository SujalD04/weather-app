import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <button 
      onClick={() => setDarkMode(!darkMode)} 
      className="relative w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-all duration-300"
    >
      {/* Animated Toggle Circle */}
      <motion.div
        className="w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-md"
        animate={{ x: darkMode ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      />
      
      {/* Sun & Moon Icons */}
      <div className="absolute left-1 text-yellow-500 dark:text-gray-400">
        <Sun size={16} className={`transition-all duration-300 ${darkMode ? "opacity-0" : "opacity-100"}`} />
      </div>
      <div className="absolute right-1 text-gray-400 dark:text-yellow-400">
        <Moon size={16} className={`transition-all duration-300 ${darkMode ? "opacity-100" : "opacity-0"}`} />
      </div>
    </button>
  );
}
