import { Button, Container } from 'react-bootstrap';
import Header from './components/Header';
import StockList from './components/StockList/StockList';
import AddStock from './components/AddStock/AddStock';
import { useState } from 'react';

function App() {
	const [showAddStockModal, setShowAddStockModal] = useState(false);

	const handleAddStock = (stock: { symbol: string; price: number }) => {
		// Add logic here to send the new stock data to your backend API
		console.log('New stock added:', stock);
		setShowAddStockModal(false);
	};

	return (
		<div className='App'>
			<Header />
			<hr />
			<Container>
        <div>
				<h2>Watchlist</h2>
				<Button variant='primary' onClick={() => setShowAddStockModal(true)}>
					+ Add Stock
				</Button>
        </div>
			</Container>
			<StockList />
			<AddStock show={showAddStockModal} onClose={() => setShowAddStockModal(false)} onAddStock={handleAddStock} />
		</div>
	);
}

export default App;

