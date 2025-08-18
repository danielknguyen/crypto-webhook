import { Symbols, CronSchedule } from "./types.js";

export const TRACKED_PAIRS: Symbols[] = [Symbols.ETHUSDT];

export const CRON_EXPRESSION = CronSchedule.ONE_MINUTE;

export const THRESHOLD_PERCENT = 0.1; // only notify if price changes >= 0.1

// Define bot configurations
export const botConfigs = [
  {
    token: process.env.ETH_BOT_DISCORD_TOKEN!,
    channelId: process.env.CRYPTO_DISCORD_CHANNEL_ID!,
    symbol: Symbols.ETHUSDT,
    previousPrice: null,
  },
];
