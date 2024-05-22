import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface AddStockProps {
	show: boolean;
	onClose: () => void;
	onAddStock: (success: boolean, message: string) => void;
}

export default function AddStock({ show, onClose, onAddStock }: AddStockProps) {
	const [symbol, setSymbol] = useState('');
	const [price, setPrice] = useState('');

	const handleAddStock = async () => {
		try {
			const response = await fetch('http://localhost:8000/api/addStock', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ symbol, price: parseFloat(price), change: 0 }),
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			onAddStock(true, `Stock symbol ${symbol} added successfully!`);
			onClose();
		} catch (error) {
			onAddStock(false, error instanceof Error ? error.message : 'An unknown error occurred');
		}
	};

	return (
		<Modal show={show} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>Add Stock</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="formStockSymbol">
						<Form.Label>Stock Symbol</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter stock symbol"
							value={symbol}
							onChange={(e) => setSymbol(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="formStockPrice">
						<Form.Label>Stock Price</Form.Label>
						<Form.Control
							type="number"
							placeholder="Enter stock price"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onClose}>
					Close
				</Button>
				<Button variant="success" onClick={handleAddStock}>
					Add Stock
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
