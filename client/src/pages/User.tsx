import React, { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

export default function User() {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="mt-4">
      <Card className="mt-4">
        <Card.Body>
          <h1 className="mb-4">User Profile</h1>
          <div className="mb-3">
            <strong>ID:</strong> {userData.value?.id}
          </div>
          <div className="mb-3">
            <strong>Name:</strong> {userData.value?.name}
          </div>
          <div className="mb-3">
            <strong>Email:</strong> {userData.value?.email}
          </div>
          <div className="mb-3">
            <strong>Password:</strong> {showPassword ? userData.value?.password : '••••••••'}
            <Button variant="link" onClick={togglePasswordVisibility}>
              {showPassword ? <EyeSlash /> : <Eye />}
            </Button>
          </div>
          <div className="mb-3">
            <strong>Created At:</strong> {new Date(userData.value?.created_at).toLocaleString()}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
