import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/btd.png'

export default function Header() {
	return (
		<>
			<Navbar className='bg-body'>
				<Container>
					<Navbar.Brand href='#home'>
						<img alt='BTD logo' src={logo} width='80' height='80' className='d-inline-block align-top' />
					</Navbar.Brand>
				</Container>
			</Navbar>
		</>
	);
}
