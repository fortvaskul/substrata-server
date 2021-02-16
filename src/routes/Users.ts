import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import logger from '@shared/Logger';

import UserDao from '@daos/User/UserDao.mock';
import { paramMissingError, IUserRequest } from '@shared/constants';

const router = Router();
const userDao = new UserDao();
const { BAD_REQUEST, CREATED, OK, NOT_FOUND } = StatusCodes;

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
    await userDao.add(req.body);
    return res.status(CREATED).end();
});



/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/

router.put('/update', async (req: IUserRequest, res: Response) => {
    const { name, username, email } = req.body;
    if (!name || !username || !email) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    // user.id = Number(user.id);
    // await userDao.update(user);
    return res.status(OK).end();
});



/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
