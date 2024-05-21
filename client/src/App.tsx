import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import User from './pages/User';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <hr />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/user' element={<User />} />
						<Route path='*' element={<NotFound />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
