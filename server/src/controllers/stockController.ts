import { Request, Response } from 'express';
import { pool } from '../database/db';
import { Stock } from '../interfaces/stock';
import { getErrorMessage } from '../utils/errorHandler';

export const getStocks = async (req: Request, res: Response): Promise<void> => {
	try {
		const result = await pool.query('SELECT * FROM stocks');
		const stocks: Stock[] = result.rows;
		res.json(stocks);
	} catch (error) {
		res.status(500).send(getErrorMessage(error));
	}
};

export const addStock = async (req: Request, res: Response): Promise<void> => {
	const { symbol, price, change }: Stock = req.body;
	try {
		const symbolExists = await pool.query('SELECT * FROM stocks WHERE symbol = $1', [symbol]);
		if (symbolExists.rows.length > 0) {
			// Symbol already exists, send a 409 Conflict response
			res.status(409).json({ message: 'Symbol already exists' });
			return;
		}

		const result = await pool.query('INSERT INTO stocks (symbol, price, change) VALUES ($1, $2, $3) RETURNING *', [
			symbol,
			price,
			change,
		]);
		const newStock: Stock = result.rows[0];
		res.status(201).json(newStock);
	} catch (error) {
		res.status(500).send(getErrorMessage(error));
	}
};
