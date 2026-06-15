import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/utils/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.routes.js";
import predictionRoutes from "./src/routes/Prediction.routes.js";
import userForecastRouter from "./src/routes/userForecast.routes.js";
import walletRoutes from "./src/routes/wallet.routes.js";

dotenv.config();

const app=express();
const PORT=process.env.PORT||5000;
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://opinionforecastingplatform.onrender.com",
    "https://opinionforecastingplatform.vercel.app"
].filter(Boolean);

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/predictions",predictionRoutes);
app.use("/api/v1/forecast",userForecastRouter);
app.use("/api/v1/wallet",walletRoutes);
app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials:true, 
    
    
}));


app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));

connectDB();
