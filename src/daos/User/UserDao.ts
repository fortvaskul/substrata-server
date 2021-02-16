import { IUser } from '@entities/User';
import { IMoneyUSD, IMoneyBitcoins } from "@entities/Money";

export interface IUserDao {
    getOne: (id: number) => Promise<IUser | null>;
    getAll: () => Promise<IUser[]>;
    add: (user: IUser) => Promise<IUser | null>;
    update: (id: number, user: IUser) => Promise<IUser | null>;
    updateUSD: (userId: number, moneyUSD: IMoneyUSD) => Promise<IUser | null>;
    updateBitcoins: (userId: number, moneyBitcoins: IMoneyBitcoins) => Promise<IUser | null>;
}

class UserDao implements IUserDao {
  
    public getOne(id: number): Promise<IUser | null> {
        // TODO
        return Promise.resolve(null);
    }
    
    public getAll(): Promise<IUser[]> {
         // TODO
        return Promise.resolve([]);
    }
    
    public async add(user: IUser): Promise<IUser | null> {
         // TODO
        return Promise.resolve(null);
    }
    
    public async update(id: number, user: IUser): Promise<IUser | null> {
         // TODO
        return Promise.resolve(null);
    }

    public async updateUSD(userId: number, moneyUSD: IMoneyUSD): Promise<IUser | null> {
         // TODO
        return Promise.resolve(null);
    }
    
    public async updateBitcoins(userId: number,
                                moneyBitcoins: IMoneyBitcoins): Promise<IUser | null> {
         // TODO
        return Promise.resolve(null);
    }
}

export default UserDao;
