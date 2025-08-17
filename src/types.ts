export enum Symbols {
  ETHUSDT = "ETHUSDT",
  BTCUSDT = "BTCUSDT",
  SOLUSDT = "SOLUSDT",
}

export enum CronSchedule {
  ONE_MINUTE = "*/1 * * * *",
  FIVE_MINUTES = "*/5 * * * *",
  FIFTEEN_MINUTES = "*/15 * * * *",
  THIRTY_MINUTES = "*/30 * * * *",
  ONE_HOUR = "0 * * * *",
  FOUR_HOURS = "0 */4 * * *",
  ONE_DAY = "0 9 * * *", // daily at 9am UTC
}

export enum Colors {
  Green = 0x00ff00,
  Red = 0xff0000,
}

export type SymbolType = keyof typeof Symbols;
export type SymbolValue = (typeof Symbols)[SymbolType];
