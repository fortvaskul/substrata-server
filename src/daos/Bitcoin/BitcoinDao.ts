import { IBitcoin } from '@entities/Bitcoin';

export interface IBitcoinDao {
    get: () => Promise<IBitcoin | null>;
    update: (bitcoin: IBitcoin) => Promise<IBitcoin | null>;
}

class BitcoinDao implements IBitcoinDao {
  
    public get(): Promise<IBitcoin | null> {
         // TODO
      return Promise.resolve(null);
    }
    
    public async update(bitcoin: IBitcoin): Promise<IBitcoin | null> {
         // TODO
        return Promise.resolve(null);
    }
}

export default BitcoinDao;
