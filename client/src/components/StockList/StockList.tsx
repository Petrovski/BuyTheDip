import { useEffect, useState } from 'react';
import StockCard from '../StockCard/StockCard';
import { Col, Container, Row } from 'react-bootstrap';

interface Stock {
	symbol: string;
	price: number;
	change: number;
}

export default function StockList() {
	const [stocks, setStocks] = useState<Stock[]>([]);

	useEffect(() => {
		setStocks([
			{ symbol: 'ES', price: 4.32, change: 1.12 },
			{ symbol: 'ES', price: 4.32, change: 1.12 },
			{ symbol: 'ES', price: 4.32, change: 1.12 },
      { symbol: 'ES', price: 4.32, change: -1.12 },
      { symbol: 'ES', price: 4.32, change: 1.12 },
      { symbol: 'ES', price: 4.32, change: 1.12 },
      { symbol: 'ES', price: 4.32, change: -1.12 },
		]);
		// const socket = new WebSocket('ws://your-websocket-url');

		// socket.onopen = () => {
		//   console.log('WebSocket connected');
		// };

		// socket.onmessage = (event) => {
		//   const stockData: Stock[] = JSON.parse(event.data);
		//   setStocks(stockData);
		// };

		// socket.onerror = (error) => {
		//   console.error('WebSocket error:', error);
		// };

		// socket.onclose = () => {
		//   console.log('WebSocket disconnected');
		//   // Optionally attempt to reconnect after a delay
		// };

		// return () => {
		//   socket.close();
		// };
	}, []);

	return (
		<div className='stock-list'>
			<Container>
				<Row>
					{stocks.map((stock) => (
						<Col key={stock.symbol} xs={12} sm={6} md={4} lg={3}>
							<StockCard {...stock} />
						</Col>
					))}
				</Row>
			</Container>
		</div>
	);
}
