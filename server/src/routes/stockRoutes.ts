import { Router } from 'express';
import { getStocks, addStock } from '../controllers/stockController';

const router = Router();

router.get('/getStocks', getStocks);
router.post('/addStock', addStock);

export default router;
