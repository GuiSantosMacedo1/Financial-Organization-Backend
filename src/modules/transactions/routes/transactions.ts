import { Router } from 'express';
import { deleteTransaction, getTransactions, postTransactions, putTransactions } from '../transactionController';

const router = Router();

router.get('/', getTransactions);
router.post('/', postTransactions);
router.put('/:id', putTransactions);
router.delete('/:id', deleteTransaction)

export default router;