import { IUser } from '@entities/User';



export interface IUserDao {
    getOne: (id: number) => Promise<IUser | null>;
    getAll: () => Promise<IUser[]>;
    add: (user: IUser) => Promise<IUser | null>;
    update: (id: number, user: IUser) => Promise<IUser | null>;
}

class UserDao implements IUserDao {


    /**
     * @param email
     */
    public getOne(id: number): Promise<IUser | null> {
        // TODO
        return Promise.resolve(null);
    }


    /**
     *
     */
    public getAll(): Promise<IUser[]> {
         // TODO
        return Promise.resolve([]);
    }


    /**
     *
     * @param user
     */
    public async add(user: IUser): Promise<IUser | null> {
         // TODO
        return Promise.resolve(null);
    }


    /**
     *
     * @param user
     */
    public async update(id: number, user: IUser): Promise<IUser | null> {
         // TODO
        return Promise.resolve(null);
    }
}

export default UserDao;
