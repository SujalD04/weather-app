import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import HistoryList from "./components/HistoryList";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import History from "./pages/History";
import SignIn from "./pages/SignIn"; // Import SignIn page
import SignUp from "./pages/SignUp"; // Import SignUp page
import { AuthProvider } from "./context/authContext"; // Ensure you're importing AuthProvider

export default function App() {
  const [weather, setWeather] = useState(null);
  const location = useLocation(); // Hook to get the current route

  // Determine if the current route is SignIn or SignUp
  const hideNavbarRoutes = ["/signin", "/signup"];

  return (
    <AuthProvider> {/* Wrap your app with AuthProvider */}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Conditionally render Navbar based on the current route */}
        {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

        {/* Page Content */}
        <div className="pt-20 p-4">
          <Routes>
            {/* Enhanced Home Route */}
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center justify-center space-y-8 px-4">
                  {/* Page Title */}
                  <h1 className="text-4xl font-semibold text-center text-gray-800 dark:text-white mb-6">
                    Welcome to the Weather App
                  </h1>

                  {/* Search Section */}
                  <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                      Search for Weather
                    </h2>
                    <SearchBar setWeather={setWeather} />
                  </div>

                  {/* Weather Card */}
                  {weather && (
                    <div className="w-full max-w-md mt-8 animate__animated animate__fadeIn">
                      <WeatherCard weather={weather} />
                    </div>
                  )}

                  {/* History Section */}
                  <div className="w-full max-w-md mt-8">
                    <HistoryList />
                  </div>

                  {/* Footer */}
                  <footer className="text-center text-sm text-gray-600 dark:text-gray-400 mt-10">
                    <p>Powered by OpenWeather API</p>
                  </footer>
                </div>
              }
            />

            {/* Other Pages */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/history" element={<History />} />
            
            {/* Sign In and Sign Up Pages */}
            <Route path="/signin" element={<SignIn />} /> {/* Sign In page route */}
            <Route path="/signup" element={<SignUp />} /> {/* Sign Up page route */}
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}
