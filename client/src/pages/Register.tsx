import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect, ChangeEvent, FormEvent, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert/Alert';
import { setWithExpiry } from '../utils/localStorageUtils';

interface FormData {
	name: string;
	email: string;
	password: string;
}

interface FormErrors {
	name: string;
	email: string;
	password: string;
}

export default function Register() {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		password: '',
	});

	const [formErrors, setFormErrors] = useState<FormErrors>({
		name: '',
		email: '',
		password: '',
	});

	const [isValid, setIsValid] = useState(false);
	const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);
	const navigate = useNavigate();

	const validateForm = useCallback((): boolean => {
		const { name, email, password } = formData;
		const errors: FormErrors = {
			name: '',
			email: '',
			password: '',
		};

		if (!name.trim()) {
			errors.name = 'Name is required';
		}

		if (!email.trim()) {
			errors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			errors.email = 'Email is invalid';
		}

		if (!password.trim()) {
			errors.password = 'Password is required';
		}

		setFormErrors(errors);
		return !errors.name && !errors.email && !errors.password;
	}, [formData]);

	useEffect(() => {
		setIsValid(validateForm());
	}, [formData, validateForm]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		if (isValid) {
			try {
				const response = await fetch('http://localhost:8000/api/register', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				});

				if (!response.ok) {
					throw new Error('Failed to register user');
				}

				const data = await response.json();
				console.log('User registered:', data);
				setAlert({ type: 'success', message: 'Registration successful! Sending you to login...' });
				setWithExpiry('userData', data, 3600000);
				setTimeout(() => {
					navigate('/');
				}, 3000);
			} catch (error: any) {
				console.error('Registration error:', error.message);
				setAlert({ type: 'danger', message: `Registration failed: ${error.message}` });
			}
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<Container className='d-flex justify-content-center align-items-center' style={{ height: '90vh' }}>
			<Row>
				<Col>
					<h1 className='text-center mb-4'>Register</h1>
					<Form onSubmit={handleSubmit}>
						{alert && <Alert variant={alert.type} message={alert.message} />}
						<Form.Group controlId='formName'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your name'
								name='name'
								value={formData.name}
								onChange={handleChange}
								isInvalid={!!formErrors.name}
							/>
							<Form.Control.Feedback type='invalid'>{formErrors.name}</Form.Control.Feedback>
						</Form.Group>
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
							Register
						</Button>
					</Form>
					<div className='mt-3'>
						<span>
							Already have an account? <Link to='/login'>Login here</Link>
						</span>
					</div>
				</Col>
			</Row>
		</Container>
	);
}
