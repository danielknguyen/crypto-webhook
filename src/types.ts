import { DiscordBot } from "./services/discordBot.js";

export enum Symbols {
  ETHUSDT = "ETHUSDT",
  BTCUSDT = "BTCUSDT",
  SOLUSDT = "SOLUSDT",
}

export const SymbolShort: Record<Symbols, string> = {
  [Symbols.ETHUSDT]: "ETH",
  [Symbols.BTCUSDT]: "BTC",
  [Symbols.SOLUSDT]: "SOL",
};

export enum CronSchedule {
  ONE_MINUTE = "*/1 * * * *",
  FIVE_MINUTES = "*/5 * * * *",
  FIFTEEN_MINUTES = "*/15 * * * *",
  THIRTY_MINUTES = "*/30 * * * *",
  ONE_HOUR = "0 * * * *",
  FOUR_HOURS = "0 */4 * * *",
  ONE_DAY = "0 9 * * *", // daily at 9am UTC
}

export enum Arrow {
  Up = "↑",
  Down = "↓",
  Null = "",
}

export type SymbolType = keyof typeof Symbols;
export type SymbolValue = (typeof Symbols)[SymbolType];

export type TrackedBot = {
  bot: DiscordBot;
  symbol: SymbolType;
  previousPrice: number | null;
};
