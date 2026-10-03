import { Router } from 'express';
import transactions from './transactions';
import users from '../users/user-route';
import meta  from '../metas/metas-route';
import account from '../routes/account';

const router = Router();

router.use('/transactions', transactions);
router.use('/users/me', account);
router.use('/users', users);
router.use('/metas', meta)

export default router;
