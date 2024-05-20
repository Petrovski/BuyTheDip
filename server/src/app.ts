import express from 'express';
import bodyParser from 'body-parser';
import stockRoutes from './routes/stockRoutes';
import { pool } from './db';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/api', stockRoutes);

pool
	.query(
		`
  CREATE TABLE IF NOT EXISTS stocks (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL,
    price FLOAT NOT NULL,
    change FLOAT NOT NULL
  )
`
	)
	.then(() => {
		console.log('Database connected and table created');
	})
	.catch((err: Error) => {
		console.error('Error connecting to the database', err);
	});

export default app;
