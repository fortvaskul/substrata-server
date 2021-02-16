import { IUser } from '@entities/User';
import { IMoneyUSD, IMoneyBitcoins } from '@entities/Money';
import { getRandomInt } from '@shared/functions';
import { IUserDao } from './UserDao';
import MockDaoMock from '../MockDb/MockDao.mock';

class UserDao extends MockDaoMock implements IUserDao {
  
    private roundTo(num: number) :number  {
        return Math.round((+num + Number.EPSILON) * 100) / 100;
    }
    
    
    public async getOne(id: number): Promise<IUser | null> {
        const db = await super.openDb();
        for (const user of db.users) {
            if (user.id === id) {
                return user;
            }
        }
        return null;
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
        throw new Error('User not found');
    }
    
    
    public async updateUSD(userId: number, moneyUSD: IMoneyUSD): Promise<IUser | null> {
        const db = await super.openDb();
        for (let i = 0; i < db.users.length; i++) {
            if (db.users[i].id === userId) {
                if (moneyUSD.action === "withdraw") {
                  const newBalance =
                    this.roundTo(db.users[i].usdBalance - this.roundTo(moneyUSD.amount));
                  if (newBalance < 0) throw new Error('The user does not have enough money');
                  else db.users[i].usdBalance = newBalance;
                } else {
                  db.users[i].usdBalance =
                    this.roundTo(db.users[i].usdBalance + this.roundTo(moneyUSD.amount));
                }
                db.users[i].updatedAt = new Date().toISOString();
                await super.saveDb(db);
                return db.users[i];
            }
        }
        throw new Error('User not found');
    }
    
    
    public async updateBitcoins(userId: number,
                                moneyBitcoins: IMoneyBitcoins): Promise<IUser | null> {
        const db = await super.openDb();
        for (let i = 0; i < db.users.length; i++) {
            if (db.users[i].id === userId) {
              const bitcoinToUSD =
                this.roundTo(db.bitcoin[0].price * this.roundTo(moneyBitcoins.amount));
                if (moneyBitcoins.action === "buy") {
                  const newUSDBalance =
                    this.roundTo(db.users[i].usdBalance - this.roundTo(bitcoinToUSD));
                  if (newUSDBalance < 0) throw new Error('The user does not have enough money');
                  else {
                    db.users[i].bitcoinAmount =
                      this.roundTo(db.users[i].bitcoinAmount + this.roundTo(moneyBitcoins.amount));
                    db.users[i].usdBalance = newUSDBalance;
                  }
                } else {
                  const newBitcoinAmount =
                    this.roundTo(db.users[i].bitcoinAmount - this.roundTo(moneyBitcoins.amount));
                  if (newBitcoinAmount < 0) new Error('The user does not have enough money');
                  else {
                    db.users[i].bitcoinAmount = newBitcoinAmount;
                    db.users[i].usdBalance =
                      this.roundTo(db.users[i].usdBalance + this.roundTo(bitcoinToUSD));
                  }
                }
                db.users[i].updatedAt = new Date().toISOString();
                await super.saveDb(db);
                return db.users[i];
            }
        }
        throw new Error('User not found');
    }
}

export default UserDao;
