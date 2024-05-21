import { Alert as BootstrapAlert } from 'react-bootstrap';

interface AlertProps {
  message: string;
  variant: 'success' | 'danger' | 'warning' | 'info';
}

export default function Alert({ message, variant }: AlertProps) {
  return (
    <BootstrapAlert variant={variant}>
      {message}
    </BootstrapAlert>
  );
}
