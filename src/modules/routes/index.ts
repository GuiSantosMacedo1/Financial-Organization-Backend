import { Router } from 'express';
import transactions from './transactions';
import users from '../users/user-route';
import meta  from '../metas/metas-route';

const router = Router();

router.use('/transactions', transactions);
router.use('/users', users);
router.use('/metas', meta)

export default router;
