import { Router } from "express";
import { TRACKED_PAIRS } from "../config.js";
import { getCurrentPrice } from "../services/binance.js";
import { sendToDiscord } from "../services/discord.js";

const router = Router();

router.get("/test", async (_, res) => {
  for (const symbol of TRACKED_PAIRS) {
    const price = await getCurrentPrice(symbol);

    if (price) {
      await sendToDiscord(
        `Testing: Current price of ${symbol} is **$${price.toFixed(2)}**`
      );
    }

    res.send("Test messages sent to Discord");
  }
});

export default router;
