import { Symbols } from "./types.js";

export const TRACKED_PAIRS: Symbols[] = [Symbols.ETHUSDT];

// string (standard cron format) that tells a scheduler when to run a job. ex.
// Run the task every 15 minutes, no matter the hour, day, month, or day of week.
export const CRON_EXPRESSION = ["*/15 * * * *"];
