import { Symbols, CronSchedule } from "./types.ts";

export const TRACKED_PAIRS: Symbols[] = [Symbols.ETHUSDT];

export const CRON_EXPRESSION = CronSchedule.ONE_MINUTE;

export const THRESHOLD_PERCENT = 0.1; // only notify if price changes >= 0.1
