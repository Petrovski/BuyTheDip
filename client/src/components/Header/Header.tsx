import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/btd.png';
import { PersonCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function Header() {
	const userData = JSON.parse(localStorage.getItem('userData') || '{}');

	const navigate = useNavigate();

	const handleNavigateToUser = (): void => {
		navigate('/user');
	};

	const handleNavigateToHome = (): void => {
		navigate('/');
	};

	const handleLogout = (): void => {
		localStorage.clear();
		window.location.href = '/login';
	};

	return (
		<>
			{userData.email ? (
				<Navbar className='bg-body'>
					<Container className='d-flex align-items-center'>
						<Navbar.Brand style={{ cursor: 'pointer' }} onClick={handleNavigateToHome}>
							<img alt='BTD logo' src={logo} width='80' height='80' className='d-inline-block align-top' />
						</Navbar.Brand>
						<PersonCircle style={{ cursor: 'pointer' }} size={40} onClick={handleNavigateToUser} />
						<Button onClick={handleLogout}>Logout</Button>
					</Container>
				</Navbar>
			) : (
				''
			)}
		</>
	);
}
