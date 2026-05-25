import { Router } from 'express';
import transactions from './transactions';
import users from '../users/user-route';

const router = Router();

router.use('/transactions', transactions);
router.use('/users', users);

export default router;
