import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../database/db';
import jwt from 'jsonwebtoken';
import { User } from '../interfaces/user';

const JWT_SECRET = 'AMAZING_SECRET_KEY';

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

export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: 'Email and password are required' });
	}

	try {
		const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

		if (result.rows.length === 0) {
			return res.status(401).json({ error: 'Invalid email or password' });
		}

		const user = result.rows[0];

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ error: 'Invalid email or password' });
		}

		const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

		res.status(200).json({ token, user });
	} catch (error) {
		console.error('Error logging in user:', error);
		res.status(500).send('Error logging in user');
	}
};
