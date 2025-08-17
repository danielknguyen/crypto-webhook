import { Router } from "express";
import { TRACKED_PAIRS } from "../config.ts";
import { getCurrentPrice } from "../services/binance.ts";
import { sendToDiscord } from "../services/discord.ts";

const router = Router();

router.get("/", async (_, res) => {
  res.send("Hello World!");
});

router.get("/test", async (_, res) => {
  for (const symbol of TRACKED_PAIRS) {
    const price = await getCurrentPrice(symbol);

    if (price) {
      await sendToDiscord(
        `Testing: Current price of ${symbol} is **$${price.toFixed(2)}**`
      );
    }
  }

  res.send("Test messages sent to Discord");
});

export default router;
