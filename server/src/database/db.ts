import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: Number(process.env.DB_PORT),
});

export async function createDatabaseIfNotExists() {
	const client = await pool.connect();
	try {
		const result = await client.query("SELECT 1 FROM pg_database WHERE datname = 'btd'");
		if (result.rows.length === 0) {
			await client.query('CREATE DATABASE btd');
			console.log('Database "brd" created');
		} else {
			console.log('Database "btd" already exists');
		}
	} catch (err: any) {
		console.error('Error creating database:', err.message);
	} finally {
		client.release();
	}
}

export async function createTablesIfNotExists() {
	const client = await pool.connect();
	try {
		await client.query(`
      CREATE TABLE IF NOT EXISTS stocks (
        id SERIAL PRIMARY KEY,
        symbol VARCHAR(10) NOT NULL,
        price FLOAT NOT NULL,
        change FLOAT NOT NULL
      );
			CREATE TABLE IF NOT EXISTS users (
				id SERIAL PRIMARY KEY,
				name VARCHAR(255) NOT NULL,
				email VARCHAR(255) UNIQUE NOT NULL,
				password VARCHAR(255) NOT NULL,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			);
    `);
		console.log('Tables created or already exist');
	} catch (err: any) {
		console.error('Error creating tables:', err.message);
	} finally {
		client.release();
	}
}

async function initializeDatabase() {
	await createDatabaseIfNotExists();
	await createTablesIfNotExists();
}

initializeDatabase()
	.then(() => {
		console.log('Database initialization successful');
	})
	.catch((err) => {
		console.error('Database initialization error:', err.message);
		process.exit(-1);
	});

pool.on('connect', () => {
	console.log('Connected to the database');
});

pool.on('error', (err) => {
	console.error('Unexpected error on idle client', err);
	process.exit(-1);
});

export default pool;
