import { IBitcoin } from '@entities/Bitcoin';
import { IBitcoinDao } from './BitcoinDao';
import MockDaoMock from '../MockDb/MockDao.mock';

class BitcoinDao extends MockDaoMock implements IBitcoinDao {
  
    private roundTo(num: number) :number  {
        return Math.round((+num + Number.EPSILON) * 100) / 100;
    }


    public async get(): Promise<IBitcoin> {
        const db = await super.openDb();
        return db.bitcoin[0];
    }


    public async update(bitcoin: IBitcoin): Promise<IBitcoin> {
        const db = await super.openDb();
        if (bitcoin.price < 0) throw new Error('Price must be greater than 0');
        db.bitcoin[0].price = this.roundTo(bitcoin.price);
        db.bitcoin[0].updatedAt = new Date().toISOString();
        await super.saveDb(db);
        return db.bitcoin[0];
    }
}

export default BitcoinDao;
