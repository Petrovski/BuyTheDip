import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface AddStockProps {
  show: boolean;
  onClose: () => void;
  onAddStock: (stock: { symbol: string; price: number; change: number }) => void;
}

export default function AddStock({ show, onClose, onAddStock }: AddStockProps) {
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(0);
  const [change, setChange] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/addStock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbol, price, change }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      onAddStock({ symbol, price, change });
      onClose();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Stock</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="symbol">
            <Form.Label>Symbol</Form.Label>
            <Form.Control
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
            />
          </Form.Group>
          <Form.Group controlId="change">
            <Form.Label>Change</Form.Label>
            <Form.Control
              type="number"
              value={change}
              onChange={(e) => setChange(parseFloat(e.target.value))}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
        {error && <div className="text-danger">{error}</div>}
      </Modal.Body>
    </Modal>
  );
}
