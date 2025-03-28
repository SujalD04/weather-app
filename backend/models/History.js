import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
  {
    city: String,
    country: String,
    temperature: Number,
    feels_like: Number,
    humidity: Number,
    pressure: Number,
    wind_speed: Number,
    wind_direction: Number,
    cloudiness: Number,
    sunrise: String,
    sunset: String,
    weather_condition: String,
    weather_icon: String,
    rain_1h: Number,
    snow_1h: Number,
  },
  { timestamps: true }
);

const History = mongoose.model("History", HistorySchema);
export default History;
