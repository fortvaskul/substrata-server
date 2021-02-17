import { IUser } from '@entities/User';
import { IMoneyUSD, IMoneyBitcoins } from '@entities/Money';
import { getRandomInt, roundTo } from '@shared/functions';
import { IUserDao } from './UserDao';
import MockDaoMock from '../MockDb/MockDao.mock';

class UserDao extends MockDaoMock implements IUserDao {
    
    
    public async getOne(id: number): Promise<IUser | null> {
        const db = await super.openDb();
        for (const user of db.users) {
            if (user.id === id) {
                return user;
            }
        }
        throw new Error('User does not exist');
    }


    public async getAll(): Promise<IUser[]> {
        const db = await super.openDb();
        return db.users;
    }


    public async add(user: IUser): Promise<IUser | null> {
        const db = await super.openDb();
        user.id = getRandomInt();
        user.bitcoinAmount = 0;
        user.usdBalance = 0;
        user.createdAt = new Date().toISOString();
        user.updatedAt = new Date().toISOString();
        db.users.push(user);
        await super.saveDb(db);
        return user;
    }


    public async update(id: number, user: IUser): Promise<IUser | null> {
        const db = await super.openDb();
        for (let i = 0; i < db.users.length; i++) {
            if (db.users[i].id === id) {
                if (user.name) db.users[i].name = user.name;
                if (user.username) db.users[i].username = user.username;
                if (user.email) db.users[i].email = user.email;
                db.users[i].updatedAt = new Date().toISOString();
                await super.saveDb(db);
                return db.users[i];
            }
        }
        throw new Error('User does not exist');
    }
    
    
    public async updateUSD(userId: number, moneyUSD: IMoneyUSD): Promise<IUser | null> {
        const db = await super.openDb();
        for (let i = 0; i < db.users.length; i++) {
            if (db.users[i].id === userId) {
                if (moneyUSD.action === "withdraw") {
                  const newBalance =
                    roundTo(db.users[i].usdBalance - roundTo(moneyUSD.amount));
                  if (newBalance < 0) throw new Error('User have insufficient funds');
                  else db.users[i].usdBalance = newBalance;
                } else {
                  db.users[i].usdBalance =
                    roundTo(db.users[i].usdBalance + roundTo(moneyUSD.amount));
                }
                db.users[i].updatedAt = new Date().toISOString();
                await super.saveDb(db);
                return db.users[i];
            }
        }
        throw new Error('User does not exist');
    }
    
    
    public async updateBitcoins(userId: number,
                                moneyBitcoins: IMoneyBitcoins): Promise<IUser | null> {
        const db = await super.openDb();
        for (let i = 0; i < db.users.length; i++) {
            if (db.users[i].id === userId) {
              const bitcoinToUSD =
                roundTo(db.bitcoin[0].price * roundTo(moneyBitcoins.amount));
                if (moneyBitcoins.action === "buy") {
                  const newUSDBalance =
                    roundTo(db.users[i].usdBalance - roundTo(bitcoinToUSD));
                  if (newUSDBalance < 0) throw new Error('User have insufficient funds');
                  else {
                    db.users[i].bitcoinAmount =
                      roundTo(db.users[i].bitcoinAmount + roundTo(moneyBitcoins.amount));
                    db.users[i].usdBalance = newUSDBalance;
                  }
                } else {
                  const newBitcoinAmount =
                    roundTo(db.users[i].bitcoinAmount - roundTo(moneyBitcoins.amount));
                  if (newBitcoinAmount < 0) throw new Error('User have insufficient funds');
                  else {
                    db.users[i].bitcoinAmount = newBitcoinAmount;
                    db.users[i].usdBalance =
                      roundTo(db.users[i].usdBalance + roundTo(bitcoinToUSD));
                  }
                }
                db.users[i].updatedAt = new Date().toISOString();
                await super.saveDb(db);
                return db.users[i];
            }
        }
        throw new Error('User does not exist');
    }
  
    public async getBalanceById(userId: number): Promise<number | null> {
      const db = await super.openDb();
      for (const user of db.users) {
        if (user.id === userId) {
          const bitcoinToUSD =
            roundTo(db.bitcoin[0].price * roundTo(user.bitcoinAmount));
          return roundTo(user.usdBalance + roundTo(bitcoinToUSD));
        }
      }
      throw new Error('User does not exist');
    }
}

export default UserDao;
