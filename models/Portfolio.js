import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true },      // Stock symbol (AAPL, TSLA, etc.)
  quantity: { type: Number, required: true },    // Number of shares
  buyPrice: { type: Number, required: true },    // Purchase price
  currentPrice: { type: Number, default: 0 }     // Latest market price
}, { timestamps: true });

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // Reference to User model
    required: true,
  },
  stocks: [stockSchema]  // Array of stocks
}, { timestamps: true });

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
export default Portfolio;
