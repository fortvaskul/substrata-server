import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import logger from '@shared/Logger';

import {
  validateUserPOSTPUTData,
  validateUserUSDPOSTData,
  validateUserBitcoinsPOSTData
} from "@shared/validation";
import UserDao from '@daos/User/UserDao.mock';
import {
  paramMissingError,
  IUserRequest,
  IMoneyUSDRequest,
  IMoneyBitcoinsRequest
} from '@shared/constants';

const router = Router();
const userDao = new UserDao();
const { BAD_REQUEST, OK, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;

router.get('/', async (req: Request, res: Response) => {
    try {
      logger.info('Trying to get users from database');
      const users = await userDao.getAll();
      logger.info('Received users from database');
      return res.status(OK).json(users);
    } catch (error) {
      logger.err('Database Error: ' + error);
      return res.status(INTERNAL_SERVER_ERROR).send();
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
      logger.info('Trying to get user from database');
      const user = await userDao.getOne(+req.params.id);
      logger.info('Received user from database');
      return res.status(OK).json(user);
    } catch (error) {
      logger.err('Database Error: ' + error);
      return res.status(NOT_FOUND).send();
    }
});

router.post('/', async (req: IUserRequest, res: Response) => {
    try {
      logger.info('Trying to validate user POST data. Received: ' + req.body);
      validateUserPOSTPUTData(req.body);
      logger.info('Validation of user POST data was successful');
    } catch (error) {
      logger.err('Validation Error: ' + error);
      return res.status(BAD_REQUEST).json({
        error: paramMissingError,
      });
    }
  
    try {
      logger.info('Trying to add an user to database');
      const user = await userDao.add(req.body);
      logger.info('User is added to database.');
      return res.status(OK).json(user);
    } catch (error) {
      logger.err('Database Error: ' + error);
      return res.status(INTERNAL_SERVER_ERROR).send();
    }
});

router.put('/:id', async (req: IUserRequest, res: Response) => {
    try {
      logger.info('Trying to validate user PUT data. Received: ' + req.body);
      validateUserPOSTPUTData(req.body);
      logger.info('Validation of user PUT data was successful');
    } catch (error) {
      logger.err('Validation Error: ' + error);
      return res.status(BAD_REQUEST).json({
        error: paramMissingError,
      });
    }
  
    try {
      logger.info('Trying to update an user in database');
      const user = await userDao.update(+req.params.id, req.body);
      logger.info('User is updated in database.');
      return res.status(OK).json(user);
    } catch (error) {
      logger.err('Database Error: ' + error);
      return res.status(INTERNAL_SERVER_ERROR).send();
    }
});

router.post('/:userId/usd', async (req: IMoneyUSDRequest, res: Response) => {
    try {
      logger.info('Trying to validate user USD POST data. Received: ' + req.body);
      validateUserUSDPOSTData(req.body);
      logger.info('Validation of user USD POST data was successful');
    } catch (error) {
      logger.err('Validation Error: ' + error);
      return res.status(BAD_REQUEST).json({
        error: paramMissingError,
      });
    }
  
    try {
      logger.info('Trying to update an user USD in database');
      const user = await userDao.updateUSD(+req.params.userId, req.body);
      logger.info('User USD is updated in database.');
      return res.status(OK).json(user);
    } catch (error) {
      logger.err('Database Error: ' + error);
      return res.status(INTERNAL_SERVER_ERROR).send();
    }
});

router.post('/:userId/bitcoins', async (req: IMoneyBitcoinsRequest, res: Response) => {
    try {
      logger.info('Trying to validate user Bitcoins POST data. Received: ' + req.body);
      validateUserBitcoinsPOSTData(req.body);
      logger.info('Validation of user Bitcoins POST data was successful');
    } catch (error) {
      logger.err('Validation Error: ' + error);
      return res.status(BAD_REQUEST).json({
        error: paramMissingError,
      });
    }
  
    try {
      logger.info('Trying to update an user Bitcoins in database');
      const user = await userDao.updateBitcoins(+req.params.userId, req.body);
      logger.info('User Bitcoins is updated in database.');
      return res.status(OK).json(user);
    } catch (error) {
      logger.err('Database Error: ' + error);
      return res.status(INTERNAL_SERVER_ERROR).send();
    }
});

router.get('/:userId/balance', async (req: Request, res: Response) => {
    try {
      logger.info('Trying to get user balance from database');
      const balance = await userDao.getBalanceById(+req.params.userId);
      logger.info('Received user balance from database');
      return res.status(OK).json({ balance });
    } catch (error) {
      logger.err('Database Error: ' + error);
      return res.status(NOT_FOUND).send();
    }
});

export default router;
