import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import logger from '@shared/Logger';

import UserDao from '@daos/User/UserDao.mock';
import {
  paramMissingError,
  IUserRequest,
  IMoneyUSDRequest,
  IMoneyBitcoinsRequest
} from '@shared/constants';

const router = Router();
const userDao = new UserDao();
const { BAD_REQUEST, OK, NOT_FOUND } = StatusCodes;

router.get('/', async (req: Request, res: Response) => {
    const users = await userDao.getAll();
    return res.status(OK).json(users);
});

router.get('/:id', async (req: Request, res: Response) => {
  const user = await userDao.getOne(+req.params.id);
  if (user) {
    return res.status(OK).json(user);
  } else {
    logger.err('User does not exist');
    return res.status(NOT_FOUND).send();
  }
});

router.post('/', async (req: IUserRequest, res: Response) => {
    const { name, username, email } = req.body;
    if (!name || !username || !email) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const user = await userDao.add(req.body);
    return res.status(OK).json(user);
});

router.put('/:id', async (req: IUserRequest, res: Response) => {
    const { name, username, email } = req.body;
    if (!name && !username && !email) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const user = await userDao.update(+req.params.id, req.body);
    if (user) {
      return res.status(OK).json(user);
    } else {
      logger.err('User does not exist');
      return res.status(NOT_FOUND).send();
    }
});

router.post('/:userId/usd', async (req: IMoneyUSDRequest, res: Response) => {
    const { action, amount } = req.body;
    if (!action || !amount) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError,
      });
    }
    const user = await userDao.updateUSD(+req.params.userId, req.body);
    if (user) {
      return res.status(OK).json(user);
    } else {
      logger.err('User does not exist or have insufficient funds');
      return res.status(NOT_FOUND).send();
    }
});

router.post('/:userId/bitcoins', async (req: IMoneyBitcoinsRequest, res: Response) => {
    const { action, amount } = req.body;
    if (!action || !amount) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError,
      });
    }
    const user = await userDao.updateBitcoins(+req.params.userId, req.body);
    if (user) {
      return res.status(OK).json(user);
    } else {
      logger.err('User does not exist or have insufficient funds');
      return res.status(NOT_FOUND).send();
    }
});

router.get('/:userId/balance', async (req: Request, res: Response) => {
  const balance = await userDao.getBalanceById(+req.params.userId);
  if (typeof balance === "number") {
    return res.status(OK).json({ balance });
  } else {
    logger.err('User does not exist');
    return res.status(NOT_FOUND).send();
  }
});

export default router;
