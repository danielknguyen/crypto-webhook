import cron from "node-cron";
import {
  TRACKED_PAIRS,
  CRON_EXPRESSION,
  THRESHOLD_PERCENT,
} from "../config.js";
import { Colors } from "../types.js";
import { getCurrentPrice } from "./binance.js";
import { sendToDiscord } from "./discord.js";

const LastPrices: Record<string, number | null> = {};

TRACKED_PAIRS.forEach((symbol) => (LastPrices[symbol] = null));

export const startScheduler = (): void => {
  cron.schedule(CRON_EXPRESSION, async () => {
    console.log("Checking prices...");

    for (const symbol of TRACKED_PAIRS) {
      const price = await getCurrentPrice(symbol);
      if (price === null) continue;

      const lastPrice = LastPrices[symbol];

      // Check if lastPrice exists, otherwise treat as changed
      const priceHasChanged =
        lastPrice === null ||
        lastPrice === undefined ||
        Math.abs((price - lastPrice) / lastPrice) * 100 >= THRESHOLD_PERCENT;

      if (priceHasChanged) {
        const changePercent =
          lastPrice && lastPrice > 0
            ? ((price - lastPrice) / lastPrice) * 100
            : 0;

        const embed = {
          title: `${symbol} Price Update`,
          description: `Current Price: **$${price.toFixed(2)}**`,
          color: changePercent >= 0 ? Colors.Green : Colors.Red, // green if up, red if down
          fields:
            lastPrice !== null && lastPrice !== undefined
              ? [
                  {
                    name: "Previous Price",
                    value: `$${lastPrice.toFixed(2)}`,
                    inline: true,
                  },
                  {
                    name: "Change",
                    value: `${changePercent.toFixed(2)}%`,
                    inline: true,
                  },
                ]
              : [],
          timestamp: new Date().toISOString(),
        };

        await sendToDiscord("", embed);

        LastPrices[symbol] = price;
      } else {
        console.log(`${symbol} price unchanged: $${price.toFixed(2)}`);
      }
    }
  });
};
