import { IUser } from "@entities/User";
import { IMoneyBitcoins, IMoneyUSD } from "@entities/Money";

export const validatePrice = (price: number): void => {
  if ((!price && price !== 0) || isNaN(price))
    throw new Error("Price must be a number greater than 0. Received: " + price);
  if (price < 0) throw new Error("Price must be greater than 0. Received: " + price);
  return;
}

export const validateUserPOSTPUTData = (user: IUser): void => {
  if (!user.name || !user.username || !user.email) throw new Error("Not all fields are provided");
  // eslint-disable-next-line max-len
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(user.email)) throw new Error("Invalid email");
  return;
}

export const validateUserUSDPOSTData = (moneyAction: IMoneyUSD): void => {
  if (!moneyAction.action || !moneyAction.amount)  throw new Error("Not all fields are provided");
  if (moneyAction.amount < 0 || isNaN(moneyAction.amount))
    throw new Error("Amount must be a number greater than 0. Received: " + moneyAction.amount);
  return;
}

export const validateUserBitcoinsPOSTData = (moneyAction: IMoneyBitcoins): void => {
  if (!moneyAction.action || !moneyAction.amount)  throw new Error("Not all fields are provided");
  if (moneyAction.amount < 0 || isNaN(moneyAction.amount))
    throw new Error("Amount must be a number greater than 0. Received: " + moneyAction.amount);
  return;
}
