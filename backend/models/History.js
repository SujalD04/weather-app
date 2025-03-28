import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    condition: { type: String, required: true },
  },
  { timestamps: true }
);

const History = mongoose.model("history", historySchema);
export default History;
