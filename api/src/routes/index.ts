import {Router} from 'express';
import {getAllItems, getItem} from '../controllers/items';
const router = Router();

router.get('/items', getAllItems);

router.get('/items/:id', getItem);

export default router;