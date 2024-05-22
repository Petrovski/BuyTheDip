import { Card } from 'react-bootstrap';
import './StockCard.css';

interface StockCardProps {
	symbol: string;
	price: number;
	change: number;
}

export default function StockCard({ symbol, price, change }: StockCardProps) {
	return (
		<Card className='stock-card' style={{ marginBottom: '20px', border: '5px solid #ccc', borderColor: change >= 0 ? '#2d990f' : '#ba2f2f' }} >
			<Card.Body>
				<Card.Title>{symbol.toUpperCase()}</Card.Title>
				<Card.Text>Price: {price}</Card.Text>
				<Card.Text style={{ color: change >= 0 ? 'green' : 'red' }}>Change: {change}%</Card.Text>
			</Card.Body>
		</Card>
	);
}
