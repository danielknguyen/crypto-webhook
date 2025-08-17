import { Router } from "express";
import { TRACKED_PAIRS } from "../config.js";
import { getCurrentPrice } from "../services/binance.js";
import { sendToDiscord } from "../services/discord.js";

const router = Router();

router.get("/", async (_, res) => {
  res.send("Hello World!");
});

router.get("/webhook_test", async (req, res) => {
  const message = req.query.message as string;

  if (!message) {
    return res
      .status(400)
      .send("Please provide a message query parameter, e.g., ?message=Hello");
  }

  try {
    await sendToDiscord(message);
    res.send(`Message sent: ${message}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send message to Discord");
  }
});

router.get("/webhook_binance_test", async (_, res) => {
  try {
    // Map each symbol to a promise for getting price and sending to Discord
    const tasks = TRACKED_PAIRS.map(async (symbol) => {
      const price = await getCurrentPrice(symbol);

      if (price !== undefined && price !== null) {
        await sendToDiscord(
          `Testing: Current price of ${symbol} is **$${price.toFixed(2)}**`
        );

        return symbol;
      }

      return null;
    });

    // Wait for all tasks to complete
    const results = await Promise.all(tasks);

    // Filter out nulls
    const sentSymbols = results.filter((symbol) => symbol !== null) as string[];

    if (sentSymbols.length > 0) {
      res.send(`Test messages sent to Discord for: ${sentSymbols.join(", ")}`);
    } else {
      res.send("ℹ️ No prices fetched, no messages sent");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send messages to Discord");
  }
});

export default router;
