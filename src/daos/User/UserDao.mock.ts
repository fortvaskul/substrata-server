import { IUser } from '@entities/User';
import { getRandomInt } from '@shared/functions';
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
}

export default UserDao;
