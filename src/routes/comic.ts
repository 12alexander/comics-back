import { Router } from 'express';
import { check } from 'express-validator';
import * as comicController from '../controllers/comicController';

const router = Router();

router.post(
  '/',
  [
    check('title').notEmpty(),    
    check('year').isNumeric(),
    check('description').notEmpty(),
    check('url').notEmpty(),
    check('amount').isNumeric(),    
    check('price').isNumeric(),
  ],
  comicController.createComic
);

router.get('/', comicController.getComics);

router.get('/:id', comicController.getComicById);

router.put(
  '/:id',
  [
    check('title').notEmpty(),    
    check('year').isNumeric(),
    check('description').notEmpty(),
    check('url').notEmpty(),
    check('amount').isNumeric(),    
    check('price').isNumeric(),
  ],
  comicController.updateComic
);


router.delete('/:id', comicController.deleteComic);

export default router;
