
import { Router } from 'express';
import { deleteMetas, getMetas, patchMetaAmountSaved, postMetas, putMetas } from './metasController';
import authenticate from '../users/auth';

const router = Router();
router.use(authenticate);

router.get('/', getMetas);
router.post('/', postMetas);
router.put('/:id', putMetas)
router.patch('/:id/amount-saved', patchMetaAmountSaved)
router.delete('/:id', deleteMetas);

export default router;
