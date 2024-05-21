import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import setupWebSocket from './websocket/websocket';
import stockRoutes from './routes/stockRoutes';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use('/api', stockRoutes);

setupWebSocket(server);

const port = process.env.PORT || 8000;
server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
