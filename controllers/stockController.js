import { getStockPrice } from "../services/stockService.js";

// GET /api/stocks/price?symbol=XYZ
export const getPrice = async (req, res) => {
  const { symbol } = req.query;
  if (!symbol) return res.status(400).json({ message: "Symbol is required" });

  try {
    const currentPrice = await getStockPrice(symbol);
    res.json({ symbol, currentPrice });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stock price", error: err.message });
  }
};

// POST /api/stocks/profit-loss
export const getProfitLoss = async (req, res) => {
  const { symbol, buyPrice, quantity } = req.body;
  if (!symbol || !buyPrice || !quantity) {
    return res.status(400).json({ message: "Symbol, buyPrice and quantity are required" });
  }

  try {
    const currentPrice = await getStockPrice(symbol);
    const profitLoss = (currentPrice - buyPrice) * quantity;
    res.json({ symbol, buyPrice, quantity, currentPrice, profitLoss });
  } catch (err) {
    res.status(500).json({ message: "Error calculating profit/loss", error: err.message });
  }
};
