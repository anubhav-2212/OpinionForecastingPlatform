import express from "express";
import  { getForecastAnalytics, getForecastHistory, submitForecast } from "../controller/userForecast.controller.js";
import userMiddleware from "../middlewares/auth.middlewares.js";
const userForecastRouter=express.Router();

userForecastRouter.post('/submit/:forecastId',userMiddleware,submitForecast)
userForecastRouter.get('/forecast-history',userMiddleware,getForecastHistory)
userForecastRouter.get('/analytics',userMiddleware,getForecastAnalytics)

export default userForecastRouter 
