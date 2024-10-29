
import './App.css';
import Home from './pages/home';
import CryptoInfo from './pages/coin';
import News from './pages/news';
import Newss from './pages/test';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    
    <Router>
      
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Coin" element={<CryptoInfo />} />
      <Route path="/News" element={<News />} />
      <Route path="/test" element={<Newss />} />
        
      </Routes>
    </Router>
  );
}

export default App;
