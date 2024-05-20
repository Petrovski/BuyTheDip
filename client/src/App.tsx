import { Container } from 'react-bootstrap';
import Header from './components/Header'
import StockList from './components/StockList/StockList';

function App() {
  return (
    <div className="App">
      <Header />
      <hr />
      <Container>
        <h2>Watchlist</h2>
      </Container>
      <StockList />
    </div>
  );
}

export default App;
