// src/components/CryptoInfo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Coin from './coin';
import CryptoChart from '../components/CryptoCharts';

import GlitchingButton from '../components/glitchingButton';
import '../styles/coin.css';// Optional: Create a CSS file for styling
function CryptoInfo() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState(null);

  // Function to handle coin selection
  const showCoinDetails = (coin) => {
    setSelectedCoin(coin);
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets', 
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 10,
              page: 1,
            }
          }
        );
        setCoins(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>

// Example usage in another component


    <div className="inventory-container" id="cyberpunk-inventory">
         {/* Left Side - Coin List */}
         <div className="inventory-list">
           {coins.map((coin, index) => (
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
               <div className="selectedCoin-details-container">
                  <div className="selectedCoin-details-header">
                    <img src={selectedCoin.image} alt={selectedCoin.name} width="40" />
                    <div className="selectedCoin-name-symbol">
                      <h2>{selectedCoin.name}</h2>
                      <p>{selectedCoin.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="selectedCoin-stat">Rank: {selectedCoin.market_cap_rank}</div>
                  <div className="selectedCoin-stat">High (24h): ${selectedCoin.high_24h?.toLocaleString()}</div>
                  <div className="selectedCoin-stat">Low (24h): ${selectedCoin.low_24h?.toLocaleString()}</div>
                  <div className="selectedCoin-stat">Total Supply: {selectedCoin.total_supply ? selectedCoin.total_supply.toLocaleString() : 'N/A'}</div>
                  <div className="selectedCoin-link">
                    <a href={`https://www.selectedCoingecko.com/en/selectedCoins/${selectedCoin.id}`} target="_blank" rel="noreferrer">View on selectedCoinGecko</a>
                  </div>
                </div>
                <div className='selectedCoin-details-graph'>
                <CryptoChart coinId={selectedCoin.id} days={30} />
                </div>
             </>
           ) : (
             <div className="coin-name">Select a Coin</div>
           )}
         </div>
       </div>
   

    </div>
  );
}

export default CryptoInfo;
