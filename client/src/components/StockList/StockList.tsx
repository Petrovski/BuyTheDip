import { Col, Container, Row } from 'react-bootstrap';
import StockCard from '../StockCard/StockCard';
import LoadingSpinner from '../Spinner/Spinner';
import Alert from '../Alert/Alert';
import useStockData from '../../hooks/useStockData';

export default function StockList() {
  const { stocks, error, loading, websocketError } = useStockData();

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
