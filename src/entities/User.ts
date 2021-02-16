export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    bitcoinAmount: number;
    usdBalance: number;
    createdAt: string;
    updatedAt: string;
}

class User implements IUser {

    public id: number;
    public name: string;
    public username: string;
    public email: string;
    public bitcoinAmount: number;
    public usdBalance: number;
    public createdAt: string;
    public updatedAt: string;

    constructor(nameOrUser: string | IUser, username?: string, email?: string, id?: number,
                bitcoinAmount?: number, usdBalance?: number, createdAt?:string, updatedAt?:string) {
        if (typeof nameOrUser === 'string') {
            this.name = nameOrUser;
            this.username = username || '';
            this.email = email || '';
            this.id = id || -1;
            this.bitcoinAmount = bitcoinAmount || -1;
            this.usdBalance = usdBalance || -1;
            this.createdAt = createdAt || new Date().toISOString();
            this.updatedAt = updatedAt || new Date().toISOString();
        } else {
            this.name = nameOrUser.name;
            this.username = nameOrUser.username;
            this.email = nameOrUser.email;
            this.id = nameOrUser.id;
            this.bitcoinAmount = nameOrUser.bitcoinAmount;
            this.usdBalance = nameOrUser.usdBalance;
            this.createdAt = nameOrUser.createdAt;
            this.updatedAt = nameOrUser.updatedAt;
        }
    }
}

export default User;
