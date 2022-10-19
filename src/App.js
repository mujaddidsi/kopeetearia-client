import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import NotFound from './pages/NotFound/NotFound';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Navigation />
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='*' element={<NotFound to='/notfound' replace />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
