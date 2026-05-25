
import { Router } from 'express';
import { postUser, listUsers, getUserById, login } from './user-controller';

const router = Router();

router.get('/', listUsers);
router.get('/:id', getUserById);
router.post('/', postUser);
router.post('/login', login);

export default router;
