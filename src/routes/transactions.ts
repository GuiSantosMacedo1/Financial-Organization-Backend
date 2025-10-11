import { Router } from 'express';
import { getTransactions, postTransactions } from '../controllers/transactionController';

const router = Router();

router.get('/', getTransactions);
router.post('/', postTransactions);

export default router;