import { Router } from 'express';
import transactions from './transactions';

const router = Router();


router.use('/transactions', transactions);

export default router;
