import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import dotenv from "dotenv";
import { Arrow, SymbolShort } from "../types.js";
import type { SymbolType } from "../types.js";

dotenv.config();

type BotConfig = {
  token: string;
  channelId: string;
};

/**
 * Represents a single Discord bot instance.
 */
export class DiscordBot {
  private client: Client;
  private channelId: string;

  /**
   * Creates a new DiscordBot instance with the provided configuration.
   * @param config - The configuration object containing the bot token and channel ID.
   */
  constructor(config: BotConfig) {
    this.channelId = config.channelId;

    this.client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    });

    this.client.once("ready", () => {
      const name = this.client.user?.username;

      console.log(`[${name}] Logged in and ready.`);
    });

    this.client.login(config.token).catch(console.error);
  }

  /**
   * Sends a message to the bot's configured channel
   */
  public async sendMessage(message: string) {
    const channel = await this.client.channels.fetch(this.channelId);

    if (!channel?.isTextBased()) return;

    const textChannel = channel as TextChannel;

    await textChannel.send(message);
  }

  /**
   * Updates the bot's nickname with current prices
   */
  public async updateNickname(symbol: SymbolType, price: number, arrow: Arrow) {
    const guild = this.client.guilds.cache.first();

    if (!guild || !guild.members.me) return;

    const nickname = `${SymbolShort[symbol]} ${arrow} $${price.toFixed(2)}`;

    try {
      await guild.members.me.setNickname(nickname);

      console.log(`Nickname updated: ${nickname}`);
    } catch (err) {
      console.error("Failed to update nickname:", err);
    }
  }
}
