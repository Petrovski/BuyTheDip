import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../database/db';
import { User } from '../interfaces/user';

export const registerUser = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	if (!password) {
		return res.status(400).json({ error: 'Password is required' });
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const newUser: User = { name, email, password: hashedPassword };
		const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [
			newUser.name,
			newUser.email,
			newUser.password,
		]);

		res.status(201).json(result.rows[0]);
	} catch (error) {
		console.error('Error registering user:', error);
		res.status(500).send('Error registering user');
	}
};
