import { Pool } from 'pg';

export const pool = new Pool({
	user: process.env.USER,
	host: process.env.HOST,
	database: process.env.DATABASE,
	password: process.env.PASSWORD,
	port: 5432,
});

export default pool;
