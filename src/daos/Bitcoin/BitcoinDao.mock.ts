import { IBitcoin } from '@entities/Bitcoin';
import { IBitcoinDao } from './BitcoinDao';
import MockDaoMock from '../MockDb/MockDao.mock';
import { roundTo } from '@shared/functions';

class BitcoinDao extends MockDaoMock implements IBitcoinDao {


    public async get(): Promise<IBitcoin> {
        const db = await super.openDb();
        return db.bitcoin[0];
    }


    public async update(bitcoin: IBitcoin): Promise<IBitcoin | null> {
        const db = await super.openDb();
        db.bitcoin[0].price = roundTo(bitcoin.price);
        db.bitcoin[0].updatedAt = new Date().toISOString();
        await super.saveDb(db);
        return db.bitcoin[0];
    }
}

export default BitcoinDao;
