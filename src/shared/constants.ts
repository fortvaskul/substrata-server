import { Request } from 'express';
import { IUser } from '@entities/User';
import { IMoneyUSD, IMoneyBitcoins } from '@entities/Money';
import { IBitcoin } from '@entities/Bitcoin';

export const paramMissingError = 'One or more of the required parameters was missing.';

export interface IUserRequest extends Request {
    body: IUser
}

export interface IMoneyUSDRequest extends Request {
    body: IMoneyUSD
}

export interface IMoneyBitcoinsRequest extends Request {
    body: IMoneyBitcoins
}

export interface IBitcoinRequest extends Request {
    body: IBitcoin
}
