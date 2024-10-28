import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GlitchingButton from '../components/glitchingButton';
import '../styles/coin.css';// Optional: Create a CSS file for styling
const Coin = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);

  // Function to handle coin selection
  const showCoinDetails = (coin) => {
    setSelectedCoin(coin);
  };

  useEffect(() => {
    const fetchCryptoData = async () => {
      const options = {
        method: 'GET',
        url: 'https://cryptocurrency-markets.p.rapidapi.com/v1/crypto/coins',
        params: { page: '1' },
        headers: {
          'x-rapidapi-key': '6f9a417b3emsh6470c08e76207e8p1483c3jsn1ebaa39b977e',
          'x-rapidapi-host': 'cryptocurrency-markets.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);

        setCryptoData(Object.values(response.data.data)); 
        setLoading(false); // Set loading to false when data is loaded
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCryptoData(); // Call the function on component mount
  }, []); // Empty dependency array to ensure it only runs once on mount
  console.log(cryptoData);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div >
 <div className="inventory-container">
      {/* Left Side - Coin List */}
      <div className="inventory-list">
        {cryptoData.map((coin, index) => (
          <div 
            key={index} 
            className="coin-item" 
            onClick={() => showCoinDetails(coin)}
          >
            {coin.name}
          </div>
        ))}
      </div>

      {/* Right Side - Coin Details */}
      <div className="coin-details">
        {selectedCoin ? (
          <>
            <div className="coin-name">{selectedCoin.name}</div>
            <div className="coin-info">Price: ${selectedCoin.price}</div>
            <div className="coin-info">Market Cap: ${selectedCoin.marketCap.toLocaleString()}</div>
            <div className="coin-info">Change: {selectedCoin.change}%</div>
          </>
        ) : (
          <div className="coin-name">Select a Coin</div>
        )}
      </div>
    </div>
<h1>Cryptocurrency Data</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((coin) => (
            <tr key={coin.key}>
               <td><img src={coin.logo} /></td>
                <td>{coin.name}</td>
                <td>{coin.symbol}</td>
                <td>Rank: {coin.rank}</td>
                <td>High (24h): ${coin.high24h}</td>
                <td>Low (24h): ${coin.low24h}</td>
                <td>Total Supply: {coin.totalSupply}</td>
                <td><a href="{coin.external_link}" target="_blank">View on CoinMarketCap</a></td>
            </tr>
          ))}
        </tbody>
      </table>
         <section id="dashboard-section">
        
         <GlitchingButton name={"united"}></GlitchingButton>
         </section>
    </div>
  );
};

export default Coin;
