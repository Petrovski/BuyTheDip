import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.webp'

export default function Header() {
	return (
		<>
			<Navbar className='bg-body'>
				<Container>
					<Navbar.Brand href='#home'>
						<img alt='BTD logo' src={logo} width='100' height='50' className='d-inline-block align-top' />
					</Navbar.Brand>
				</Container>
			</Navbar>
		</>
	);
}
