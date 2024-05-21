import { useEffect, useState } from 'react';
import StockCard from '../StockCard/StockCard';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../Spinner/Spinner';
import Alert from '../Alert/Alert';

interface Stock {
  symbol: string;
  price: number;
  change: number;
}

export default function StockList() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [websocketError, setWebsocketError] = useState<boolean>(false);

  useEffect(() => {
    const fetchStocksAndSetupWebSocket = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/getStocks');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: Stock[] = await response.json();
        setStocks(data);
        setLoading(false);

        const socket = new WebSocket('ws://localhost:8000');

        socket.onopen = () => {
          console.log('WebSocket connected');
          setWebsocketError(false);
        };

        socket.onmessage = (event) => {
          const stockData: Stock[] = JSON.parse(event.data);
          setStocks(stockData);
        };

        socket.onerror = (error) => {
          console.error('WebSocket error:', error);
          setWebsocketError(true); 
        };

        socket.onclose = () => {
          console.log('WebSocket disconnected');
          setTimeout(() => fetchStocksAndSetupWebSocket(), 5000);
        };

        return () => {
          socket.close();
        };
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };

    fetchStocksAndSetupWebSocket();
  }, []);

  return (
    <div className='stock-list'>
      <Container>
        {loading && <LoadingSpinner />}
        {error && <Alert message={error} variant='danger' />}
        {websocketError && <Alert message='WebSocket error occurred' variant='danger' />}
        {!loading && !error && !websocketError && (
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
