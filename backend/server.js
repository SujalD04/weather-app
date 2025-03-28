import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import weatherRoutes from "./routes/weatherRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Allowed CORS origins
const allowedOrigins = [ "http://localhost:5173", "https://weather-app-alpha-three-60.vercel.app/" ];

app.use(cors({ 
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Weather API is running"));

// Routes
app.use("/api", weatherRoutes);

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
