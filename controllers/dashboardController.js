import Portfolio from "../models/Portfolio.js";

// ✅ Get Dashboard (User Portfolio)
export const getDashboard = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) {
      return res.json({ message: "No portfolio found", stocks: [] });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard", error: error.message });
  }
};

// ✅ Add Stock to Portfolio
export const addStock = async (req, res) => {
  try {
    const { symbol, company, quantity, buyPrice } = req.body;

    let portfolio = await Portfolio.findOne({ user: req.user.id });

    if (!portfolio) {
      portfolio = new Portfolio({ user: req.user.id, stocks: [] });
    }

    portfolio.stocks.push({ symbol, company, quantity, buyPrice });
    await portfolio.save();

    res.status(201).json({ message: "Stock added successfully", portfolio });
  } catch (error) {
    res.status(500).json({ message: "Error adding stock", error: error.message });
  }
};

// ✅ Update Stock in Portfolio
export const updateStock = async (req, res) => {
  try {
    const { stockId } = req.params;
    const { quantity, buyPrice, currentPrice } = req.body;

    const portfolio = await Portfolio.findOne({ user: req.user.id });

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const stock = portfolio.stocks.id(stockId);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    // Update values (only if provided)
    if (quantity !== undefined) stock.quantity = quantity;
    if (buyPrice !== undefined) stock.buyPrice = buyPrice;
    if (currentPrice !== undefined) stock.currentPrice = currentPrice;

    await portfolio.save();

    res.json({ message: "Stock updated successfully", portfolio });
  } catch (error) {
    res.status(500).json({ message: "Error updating stock", error: error.message });
  }
};

// ✅ Delete Stock from Portfolio
export const deleteStock = async (req, res) => {
  try {
    const { stockId } = req.params;

    const portfolio = await Portfolio.findOne({ user: req.user.id });

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const stock = portfolio.stocks.id(stockId);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    stock.deleteOne(); // remove stock
    await portfolio.save();

    res.json({ message: "Stock deleted successfully", portfolio });
  } catch (error) {
    res.status(500).json({ message: "Error deleting stock", error: error.message });
  }
};
