import axios from "axios";
import type { SymbolType } from "../types.js";

const BASE_URL = "https://api.binance.us";

/**
 * Fetches the current price of a symbol from Binance.
 *
 * @param {SymbolType} symbol - The symbol to fetch the price of.
 * @return {Promise<number | null>} A promise that resolves to the current price of the symbol, or null if an error occurred.
 */
export const getCurrentPrice = async (
  symbol: SymbolType
): Promise<number | null> => {
  try {
    // Binance free endpoint have rate limits:
    // 1200 requests per minute per ID (public endpoint)
    const url = `${BASE_URL}/api/v3/ticker/price?symbol=${symbol}`;
    const response = await axios.get<{ price: string }>(url);

    return parseFloat(response.data.price);
  } catch (error: any) {
    console.error(` Error fetching ${symbol}: `, error.message);
    return null;
  }
};
