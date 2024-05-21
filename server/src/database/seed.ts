import pool from './db';

async function seedDatabase() {
	const client = await pool.connect();
	try {
		await client.query(`
      INSERT INTO stocks (symbol, price, change)
      VALUES
        ('AAPL', 150.25, 1.50),
        ('GOOGL', 2850.75, -2.25),
        ('MSFT', 300.50, 0.75)
    `);
		console.log('Database seeded with sample data');
	} catch (err: any) {
		console.error('Error seeding database:', err.message);
	} finally {
		client.release();
	}
}

seedDatabase();
