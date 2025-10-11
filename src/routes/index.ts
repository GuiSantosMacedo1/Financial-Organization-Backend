import { Router } from 'express';
import transactionsRouter from './transactions';
import accountsRouter from './accounts';

const router = Router();

// Mount route modules
router.use('/transactions', transactionsRouter);
router.use('/accounts', accountsRouter);

export default router;
