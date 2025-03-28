export default function WeatherCard({ weather }) {
    return (
      <div className="mt-4 p-4 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-bold">{weather.city}</h2>
        <p>Temperature: {weather.temperature}°C</p>
        <p>Humidity: {weather.humidity}%</p>
        <p>Condition: {weather.condition}</p>
      </div>
    );
  }
  