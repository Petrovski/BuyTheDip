import { useState, ChangeEvent, FormEvent } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { setWithExpiry } from '../utils/localStorageUtils';
import Alert from '../components/Alert/Alert';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email: string;
  password: string;
}

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({ setIsAuthenticated }: LoginProps) {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState<FormErrors>({ email: '', password: '' });
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const { email, password } = formData;
    const errors: FormErrors = { email: '', password: '' };

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    }

    setFormErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setIsValid(validateForm());
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (isValid) {
      try {
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to login');
        }

        const data = await response.json();
        console.log(data);
        setWithExpiry('userToken', data.token, 3600000);
        setAlert({ type: 'success', message: 'Login successful! Taking you to your watchlist...' });
        setTimeout(() => {
          localStorage.setItem('userData', JSON.stringify(data.user));
          setIsAuthenticated(true);
          navigate('/');
        }, 3000)
      } catch (error: any) {
        console.error('Login error:', error.message);
        setAlert({ type: 'danger', message: 'Login failed: ' + error.message });
      }
    }
  };

  return (
    <Container className='d-flex justify-content-center align-items-center' style={{ height: '60vh' }}>
      <Row>
        <Col>
          <h1 className='text-center mb-4'>Login</h1>
          {alert && <Alert variant={alert.type} message={alert.message} />}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter your email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!formErrors.email}
              />
              <Form.Control.Feedback type='invalid'>{formErrors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter your password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!formErrors.password}
              />
              <Form.Control.Feedback type='invalid'>{formErrors.password}</Form.Control.Feedback>
            </Form.Group>
            <Button style={{ marginTop: '20px' }} variant='primary' type='submit' disabled={!isValid}>
              Login
            </Button>
          </Form>
          <p className='mt-3'>
            Don't have an account? <Link to='/register'>Register here</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
