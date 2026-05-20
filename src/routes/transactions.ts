import { Router } from 'express';
import { getTransactions, postTransactions, putTransactions } from '../controllers/transactionController';

const router = Router();

router.get('/', getTransactions);
router.post('/', postTransactions);
router.put('/:id', putTransactions);

export default router;