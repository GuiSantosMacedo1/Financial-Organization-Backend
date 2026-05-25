import { Router } from 'express';
import { deleteTransaction, getTransactions, postTransactions, putTransactions } from '../transactions/transactionController';
import authenticate from '../users/auth';

const router = Router();

router.use(authenticate);

router.get('/', getTransactions);
router.post('/', postTransactions);
router.put('/:id', putTransactions);
router.delete('/:id', deleteTransaction)

export default router;