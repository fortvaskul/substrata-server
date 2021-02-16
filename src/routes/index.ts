import { Router } from 'express';
import UserRouter from './Users';
import BitcoinRouter from './Bitcoin';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/bitcoin', BitcoinRouter);

// Export the base-router
export default router;
