import { Router } from 'express';
import { getStocks, addStock } from '../controllers/stockController';

const router = Router();

router.get('/getStocks', getStocks);
router.post('/stocks', addStock);

export default router;
