import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import logger from '@shared/Logger';

import { validatePrice } from "@shared/validation";
import BitcoinDao from '@daos/Bitcoin/BitcoinDao.mock';
import {
  paramMissingError,
  IBitcoinRequest
} from '@shared/constants';

const router = Router();
const bitcoinDao = new BitcoinDao();
const { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } = StatusCodes;

router.get('/', async (req: Request, res: Response) => {
    try {
      logger.info('Trying to get bitcoin price from database');
      const bitcoin = await bitcoinDao.get();
      logger.info('Received bitcoin price from database');
      return res.status(OK).json(bitcoin);
    } catch (error) {
      logger.err('Database Error: ' + error);
      return res.status(INTERNAL_SERVER_ERROR).send();
    }
});

router.put('/', async (req: IBitcoinRequest, res: Response) => {
    try {
      logger.info('Trying to validate bitcoin price. Received: ' + req.body.price);
      validatePrice(req.body.price);
      logger.info('Validation of bitcoin price was successful');
    } catch (error) {
      logger.err('Validation Error: ' + error);
      return res.status(BAD_REQUEST).json({
        error: paramMissingError,
      });
    }

    try {
      logger.info('Trying to update bitcoin price in database');
      const bitcoin = await bitcoinDao.update(req.body);
      logger.info('Bitcoin price is updated in database.');
      return res.status(OK).json(bitcoin);
    } catch (error) {
      logger.err('Database Error: ' + error);
      return res.status(INTERNAL_SERVER_ERROR).send();
    }
});

export default router;
