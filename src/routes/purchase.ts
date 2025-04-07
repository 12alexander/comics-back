import { Router } from 'express';
import * as purchaseController from '../controllers/purchaseController';

const router = Router();

router.post('/buy/:comicId', purchaseController.purchaseComic);

router.get('/', purchaseController.getPurchases);

export default router;
