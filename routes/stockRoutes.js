import express from "express";
import { getPrice, getProfitLoss } from "../controllers/stockController.js";

const router = express.Router();

// GET real-time stock price
router.get("/price", getPrice);

// POST calculate profit/loss
router.post("/profit-loss", getProfitLoss);

export default router;
