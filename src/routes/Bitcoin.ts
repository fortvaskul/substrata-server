import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import logger from '@shared/Logger';

import BitcoinDao from '@daos/Bitcoin/BitcoinDao.mock';
import {
  paramMissingError,
  IBitcoinRequest
} from '@shared/constants';

const router = Router();
const bitcoinDao = new BitcoinDao();
const { BAD_REQUEST, OK, NOT_FOUND } = StatusCodes;

router.get('/', async (req: Request, res: Response) => {
    const bitcoin = await bitcoinDao.get();
    return res.status(OK).json(bitcoin);
});

router.put('/', async (req: IBitcoinRequest, res: Response) => {
    const { price } = req.body;
    if (!price) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const bitcoin = await bitcoinDao.update(req.body);
  return res.status(OK).json(bitcoin);
});

export default router;
