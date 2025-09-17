import yahooFinance from "yahoo-finance2";

export const getStockPrice = async (symbol) => {
  try {
    // For Indian stocks, add ".NS" (NSE) or ".BO" (BSE)
    const querySymbol = symbol.includes('.') ? symbol : symbol.toUpperCase();

    const quote = await yahooFinance.quote(querySymbol);

    if (!quote || !quote.regularMarketPrice) {
      throw new Error("Stock not found");
    }

    return quote.regularMarketPrice;
  } catch (error) {
    console.error("Error fetching stock price:", error.message);
    throw new Error("Failed to fetch stock price");
  }
};
