import express,{urlencoded} from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import predictionRoutes from "./routes/Prediction.routes.js";
import userForecastRouter from "./routes/userForecast.routes.js";
import walletRoutes from "./routes/wallet.routes.js";

dotenv.config();

const app=express();
const PORT=process.env.PORT;
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    allowedHeaders:["Content-Type","Authorization"] ,
    methods:["GET","POST","PUT","DELETE"]
}));
app.use(cookieParser( ))
app.use(urlencoded({extended:true}));
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/prediction",predictionRoutes)
app.use('api/v1/userForecast',userForecastRouter)
app.use('/api/v1/wallet',walletRoutes)

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));

connectDB();