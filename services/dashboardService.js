import Portfolio from "../models/Portfolio.js";

// ✅ Get user portfolio
export const getUserPortfolio = async (userId) => {
  return await Portfolio.findOne({ user: userId });
};

// ✅ Add stock to user portfolio
export const addStockToPortfolio = async (userId, stockData) => {
  let portfolio = await Portfolio.findOne({ user: userId });

  if (!portfolio) {
    portfolio = new Portfolio({ user: userId, stocks: [] });
  }

  portfolio.stocks.push(stockData);
  await portfolio.save();
  return portfolio;
};

// ✅ Update stock in user portfolio
export const updateStockInPortfolio = async (userId, stockId, updatedData) => {
  const portfolio = await Portfolio.findOne({ user: userId });

  if (!portfolio) return null;

  const stock = portfolio.stocks.id(stockId);
  if (!stock) return null;

  // Update only provided fields
  Object.keys(updatedData).forEach((key) => {
    stock[key] = updatedData[key] ?? stock[key];
  });

  await portfolio.save();
  return portfolio;
};

// ✅ Delete stock from portfolio
export const deleteStockFromPortfolio = async (userId, stockId) => {
  const portfolio = await Portfolio.findOne({ user: userId });

  if (!portfolio) return null;

  const stock = portfolio.stocks.id(stockId);
  if (!stock) return null;

  stock.deleteOne();
  await portfolio.save();

  return portfolio;
};
