import { useEffect, useState } from 'react';
import StockCard from '../StockCard/StockCard';
import { Col, Container, Row } from 'react-bootstrap';
import Alert from '../Alert/Alert';
import LoadingSpinner from '../Spinner/Spinner';

interface Stock {
	symbol: string;
	price: number;
	change: number;
}

export default function StockList() {
	const [stocks, setStocks] = useState<Stock[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchStocks = async () => {
			try {
				const response = await fetch('http://localhost:8000/api/getStocks');
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}
				const data: Stock[] = await response.json();
				setStocks(data);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError('An unknown error occurred');
				}
			} finally {
				setLoading(false);
			}
		};

		fetchStocks();

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
				{loading && <LoadingSpinner />}
				{error && <Alert message={error} variant='danger' />}
				{!loading && !error && (
					<Row>
						{stocks.map((stock) => (
							<Col key={stock.symbol} xs={12} sm={6} md={4} lg={3}>
								<StockCard {...stock} />
							</Col>
						))}
					</Row>
				)}
			</Container>
		</div>
	);
}