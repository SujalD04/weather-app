import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ 
    origin: ["http://localhost:5173", "https://somedomain.com"], 
    methods: ["GET", "POST"], 
    allowedHeaders: ["Content-Type"],
    credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Optional for handling form data

// Define basic route before DB connection
app.get("/", (req, res) => {
    res.send("🚀 Server running on port 5000");
});

// Connect to DB and Start Server
const startServer = async () => {
    try {
        await connectDB();
        console.log("✅ MongoDB connected, starting server...");
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    } catch (err) {
        console.error("❌ Failed to connect to MongoDB:", err);
        process.exit(1);
    }
};

startServer();
