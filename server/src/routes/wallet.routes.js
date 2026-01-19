import express from "express";
import { getwallet } from "../controller/wallet.controller.js";
import userMiddleware from "../middlewares/auth.middlewares.js";

const walletRoutes = express.Router();

walletRoutes.get('/wallet',userMiddleware,getwallet)

export default walletRoutes