import { Spinner } from 'react-bootstrap';

export default function LoadingSpinner() {
	return (
		<div className='d-flex justify-content-center align-items-center'>
			<Spinner animation='border' role='status' style={{ width: '5rem', height: '5rem' }}>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		</div>
	);
}
