import axios from "axios";
import type { SymbolType } from "../types.js";

export const getCurrentPrice = async (
  symbol: SymbolType
): Promise<number | null> => {
  try {
    // Binance free endpoint have rate limits:
    // 1200 requests per minute per ID (public endpoint)
    const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
    const response = await axios.get<{ price: string }>(url);

    return parseFloat(response.data.price);
  } catch (error: any) {
    console.error(` Error fetching ${symbol}: `, error.message);
    return null;
  }
};
