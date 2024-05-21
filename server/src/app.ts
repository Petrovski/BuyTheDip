import express from 'express';
import bodyParser from 'body-parser';
import stockRoutes from './routes/stockRoutes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', stockRoutes);

export default app;
