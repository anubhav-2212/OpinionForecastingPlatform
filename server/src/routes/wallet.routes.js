import express from "express";
import { getwallet } from "../controller/wallet.controller.js";
import userMiddleware from "../middlewares/auth.middlewares.js";

const walletRoutes = express.Router();

walletRoutes.get('/balance',userMiddleware,getwallet)

export default walletRoutes