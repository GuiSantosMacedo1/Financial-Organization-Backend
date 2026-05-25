import { Router } from 'express';
import { deleteTransaction, getTransactions, postTransactions, putTransactions } from '../transactions/transactionController';

const router = Router();

router.get('/', getTransactions);
router.post('/', postTransactions);
router.put('/:id', putTransactions);
router.delete('/:id', deleteTransaction)

export default router;