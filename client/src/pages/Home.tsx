import { Button } from 'react-bootstrap';
import StockList from '../components/StockList/StockList';
import AddStock from '../components/AddStock/AddStock';
import Alert from '../components/Alert/Alert';
import { useState } from 'react';

export default function Home() {
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
    <>
      {alertMessage && <Alert message={alertMessage} variant={alertVariant} />}
      <h2 style={{ marginBottom: '30px' }}>Your Watchlist</h2>
      <Button style={{ marginBottom: '30px' }} variant='primary' onClick={() => setShowAddStockModal(true)}>
        + Add Stock
      </Button>
      <StockList />
      <AddStock show={showAddStockModal} onClose={() => setShowAddStockModal(false)} onAddStock={handleAddStock} />
    </>
  );
}