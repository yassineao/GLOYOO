
import './App.css';
import Home from './pages/home';
import CryptoInfo from './pages/coin';
import News from './pages/news';
import CoinP from './pages/test';
import Navbar from './components/Navbar';
import Login from './pages/login';
import Register from './pages/register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fontsource/monoton';
import '@fontsource/iceland';
import '@fontsource/pacifico';
import '@fontsource/press-start-2p';
import '@fontsource/audiowide';
import '@fontsource/vampiro-one';

function App() {
  return (
    
    <Router>
      
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Coin" element={<CryptoInfo />} />
      <Route path="/News" element={<News />} />
      <Route path="/test" element={<CoinP coin={'WETH'} />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
        
      </Routes>
    </Router>
  );
}

export default App;
