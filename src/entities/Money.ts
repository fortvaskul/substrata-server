export interface IMoneyUSD {
  action: "withdraw" | "deposit";
  amount: number;
}

export interface IMoneyBitcoins {
  action: "buy" | "sell";
  amount: number;
}
