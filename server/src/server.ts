import http from 'http';
import app from './app';
import { wss } from './websocket/websocket';
import WebSocket from 'ws';
import dotenv from 'dotenv';
dotenv.config();

const server = http.createServer(app);

server.on('upgrade', (request: http.IncomingMessage, socket: any, head: Buffer) => {
	wss.handleUpgrade(request, socket, head, (ws: WebSocket, request: http.IncomingMessage) => {
		wss.emit('connection', ws, request);
	});
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
