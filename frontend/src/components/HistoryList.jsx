import PropTypes from "prop-types";

export default function HistoryList({ history = [] }) {
  if (!Array.isArray(history)) {
    console.error("HistoryList expects history to be an array, but got:", history);
    return null; // Return nothing if data is invalid
  }

  // Group history by city
  const cityGroups = history.reduce((acc, item) => {
    acc[item.city] = acc[item.city] || [];
    acc[item.city].push(item);
    return acc;
  }, {});

  return (
    <div className="mt-5 space-y-4 w-full">
      {Object.keys(cityGroups).map((city, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800 transition-all w-full"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {city}
          </h2>
          <ul className="space-y-2">
            {cityGroups[city].map((entry, i) => (
              <li
                key={i}
                className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg flex justify-between items-center"
              >
                <span>
                  {entry.country} - {entry.temperature}°C
                </span>
                <img
                  src={entry.weather_icon}
                  alt={entry.weather_condition}
                  className="w-6 h-6"
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

HistoryList.propTypes = {
  history: PropTypes.array,
};
