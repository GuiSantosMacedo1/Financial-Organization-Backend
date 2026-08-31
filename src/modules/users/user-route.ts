
import { Router } from 'express';
import { postUser, listUsers, getUserById, login } from './user-controller';
import authenticate from './auth';
import { loginLimit } from '../../middlewares/rate-limit';

const router = Router();

router.get('/', authenticate, listUsers);
router.get('/:id', authenticate, getUserById);
router.post('/', postUser);
router.post('/login', loginLimit, login);

export default router;
