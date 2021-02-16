import { IUser } from '@entities/User';



export interface IUserDao {
    getOne: (id: number) => Promise<IUser | null>;
    getAll: () => Promise<IUser[]>;
    add: (user: IUser) => Promise<void>;
    update: (user: IUser) => Promise<void>;
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
    public async add(user: IUser): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param user
     */
    public async update(user: IUser): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }
}

export default UserDao;
