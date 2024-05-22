import WebSocket from 'ws';
import pool from '../database/db';
import { Stock } from '../interfaces/stock';

async function fetchStocks(): Promise<Stock[]> {
	const result = await pool.query('SELECT * FROM stocks');
	return result.rows;
}

async function randomizeStockPrices() {
	const stocks = await fetchStocks();
	const updatedStocks = stocks.map((stock) => {
		const originalPrice = stock.price;
		const change = parseFloat(((Math.random() - 0.5) * 10).toFixed(2));
		const newPrice = Math.max(parseFloat((originalPrice + change).toFixed(2)), 0);
		const changeRelativeToOriginal = ((newPrice - originalPrice) / originalPrice) * 100;
		return { ...stock, price: newPrice, change: +changeRelativeToOriginal.toFixed(2) };
	});

	const updatePromises = updatedStocks.map((stock) =>
		pool.query('UPDATE stocks SET price = $1, change = $2 WHERE id = $3', [stock.price, stock.change, stock.id])
	);

	await Promise.all(updatePromises);

	return updatedStocks;
}

function broadcastStockUpdates(wss: WebSocket.Server, stocks: Stock[]) {
	const data = JSON.stringify(stocks);
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(data);
		}
	});
}

export default function setupWebSocket(server: any) {
	const wss = new WebSocket.Server({ server });

	wss.on('connection', async (ws) => {
		console.log('WebSocket connected');

		const stocks = await fetchStocks();
		ws.send(JSON.stringify(stocks));

		ws.on('close', () => {
			console.log('WebSocket disconnected');
		});
	});

	setInterval(async () => {
		const updatedStocks = await randomizeStockPrices();
		broadcastStockUpdates(wss, updatedStocks);
	}, 5000);
}
