import axios from "axios";

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "";

type DiscordEmbed = {
  title?: string;
  description?: string;
  color?: number;
  fields?: { name: string; value: string; inline?: boolean }[];
  timestamp?: string;
};

export const sendToDiscord = async (message: string, embed?: DiscordEmbed) => {
  try {
    const payload: any = embed ? { embeds: [embed] } : { content: message };

    await axios.post(WEBHOOK_URL, payload);
  } catch (error: any) {
    console.error("Discord send error: ", error.message);
    return null;
  }
};
