import { Button, Container } from 'react-bootstrap';
import Header from './components/Header/Header';
import StockList from './components/StockList/StockList';
import AddStock from './components/AddStock/AddStock';
import Alert from './components/Alert/Alert';
import { useState } from 'react';

function App() {
	const [showAddStockModal, setShowAddStockModal] = useState(false);
	const [alertMessage, setAlertMessage] = useState<string | null>(null);
	const [alertVariant, setAlertVariant] = useState<'success' | 'danger'>('success');

	const handleAddStock = (success: boolean, message: string) => {
		setShowAddStockModal(false);
		setAlertMessage(message);
		setAlertVariant(success ? 'success' : 'danger');
		showAlert();
	};

	const showAlert = () => {
		setTimeout(() => {
			setAlertMessage(null);
		}, 8000);
	};

	return (
		<div className='App'>
			<Header />
			<hr />
			<Container>
			{alertMessage && <Alert message={alertMessage} variant={alertVariant} />}
				<div>
					<h2 style={{marginBottom: '30px'}}>Your Watchlist</h2>
					<Button style={{marginBottom: '30px'}} variant='primary' onClick={() => setShowAddStockModal(true)}>
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
