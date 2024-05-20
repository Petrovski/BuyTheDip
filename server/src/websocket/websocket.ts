import WebSocket from 'ws';

export const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
	console.log('Client connected');

	ws.on('message', (message) => {
		console.log('Received:', message);
	});

	ws.on('close', () => {
		console.log('Client disconnected');
	});

	// Simulate sending stock updates
	setInterval(() => {
		ws.send(JSON.stringify({ symbol: 'AAPL', price: 150 + Math.random() * 10, change: Math.random() * 2 - 1 }));
	}, 2000);
});
