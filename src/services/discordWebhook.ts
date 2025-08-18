import axios from "axios";

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "";

type DiscordEmbed = {
  title?: string;
  description?: string;
  color?: number;
  fields?: { name: string; value: string; inline?: boolean }[];
  timestamp?: string;
};

/**
 * Sends a message to a Discord webhook.
 *
 * @param message - The content of the message.
 * @param embed - An optional Discord embed to send alongside the message.
 * @returns A Promise that resolves when the message is successfully sent, or null if an error occurred.
 */
export const sendToDiscord = async (message: string, embed?: DiscordEmbed) => {
  try {
    const payload: any = embed ? { embeds: [embed] } : { content: message };

    await axios.post(WEBHOOK_URL, payload);
  } catch (error: any) {
    console.error("Discord send error: ", error.message);
    return null;
  }
};

/* 
Example usage:

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

// await sendToDiscord("", embed);
*/
