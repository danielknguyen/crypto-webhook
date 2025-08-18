import cron from "node-cron";
import { TRACKED_PAIRS, CRON_EXPRESSION } from "../config.js";
import { getCurrentPrice } from "./binance.js";
import { DiscordBot } from "./discordBot.js";
import { botConfigs } from "../config.js";
import type { TrackedBot } from "../types.js";
import { Arrow } from "../types.js";

const trackedBots: TrackedBot[] = botConfigs.map(
  ({ token, channelId, symbol, previousPrice }) => ({
    bot: new DiscordBot({ token, channelId }),
    symbol,
    previousPrice,
  })
);

const prices: Record<string, number | null> = {};

// Initialize tracked pairs with null prices
TRACKED_PAIRS.forEach((symbol) => (prices[symbol] = null));

/**
 * Starts a scheduler that fetches prices for tracked pairs and updates the discord bots' nicknames.
 * Runs on a cron schedule specified in the config.
 *
 * @returns {void}
 */
export const startScheduler = (): void => {
  cron.schedule(CRON_EXPRESSION, async () => {
    console.log("Fetching prices...");

    for (const tracked of trackedBots) {
      const { bot, symbol, previousPrice } = tracked;

      const price = await getCurrentPrice(symbol);

      if (price === null) {
        console.log(`${symbol} price is null, skipping update.`);
        continue;
      }

      let arrow = Arrow.Null;

      if (previousPrice !== null) {
        if (price > previousPrice) {
          arrow = Arrow.Up;
        }

        if (price < previousPrice) {
          arrow = Arrow.Down;
        }
      }

      await bot.updateNickname(symbol, price, arrow);

      tracked.previousPrice = price;
    }
  });
};
