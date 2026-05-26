
import { Router } from 'express';
import { deleteMetas, getMetas, postMetas, putMetas } from './metasController';
import authenticate from '../users/auth';

const router = Router();
router.use(authenticate);

router.get('/', getMetas);
router.post('/', postMetas);
router.put('/:id', putMetas)
router.delete('/:id', deleteMetas);

export default router;
