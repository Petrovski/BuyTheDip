import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { getWithExpiry } from './utils/localStorageUtils';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Spinner from './components/Spinner/Spinner';
import User from './pages/User';
import NotFound from './pages/NotFound';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getWithExpiry('userToken');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={isAuthenticated ? <Home /> : <Navigate to='/login' />} />
        <Route
          path='/register'
          element={!isAuthenticated ? <Register /> : <Navigate to='/' />}
        />
        <Route
          path='/login'
          element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to='/' />}
        />
				<Route path='/user' element={<User />} />
				<Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
