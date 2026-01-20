import express from "express";
import  { getForecastHistory, submitForecast } from "../controller/userForecast.controller.js";
import userMiddleware from "../middlewares/auth.middlewares.js";
const userForecastRouter=express.Router();

userForecastRouter.post('/submit/:forecastId',userMiddleware,submitForecast)
userForecastRouter.get('/forecast-history',userMiddleware,getForecastHistory)

export default userForecastRouter 