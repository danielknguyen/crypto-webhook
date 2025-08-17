export enum Symbols {
  ETHUSDT = "ETHUSDT",
  BTCUSDT = "BTCUSDT",
  SOLUSDT = "SOLUSDT",
}

export type SymbolType = keyof typeof Symbols;
export type SymbolValue = (typeof Symbols)[SymbolType];
