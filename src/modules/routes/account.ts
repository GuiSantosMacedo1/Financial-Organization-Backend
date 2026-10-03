import { Router } from 'express';
import authenticate from '../users/auth';
import { getAccount, updateAccount, changePassword } from '../settings/account-controller';

const router = Router();

router.use(authenticate);

router.get('/', (req, res, next) => {
  void getAccount(req as Parameters<typeof getAccount>[0], res, next);
});
router.put('/', (req, res, next) => {
  void updateAccount(req as Parameters<typeof updateAccount>[0], res, next);
});
router.patch('/password', (req, res, next) => {
  void changePassword(req as Parameters<typeof changePassword>[0], res, next);
});

export default router;