// src/components/CryptoInfo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Coin from './coin';

import DataSeriesChart from '../components/CryptoCharts';
import GlitchLoader from '../components/loader';

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
              per_page: 27,
              page: 1,
            }
          }
        );
        setCoins(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);
  if (loading) {
    return <GlitchLoader></GlitchLoader>;
  }

  return (
    <div>



    <div className="inventory-container" id="cyberpunk-inventory">
         {/* Left Side - Coin List */}

         <div className="inventory-list">

           {coins.map((coin, index) => (
             <div 
               key={index} 
               className="coin-item" 
               onClick={() => showCoinDetails(coin)}
             >
                                  <img  src={coin.image} alt={coin.name} width="40" />

              <h1>{coin.name}</h1> 
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
                      <h2 id='titel'>{selectedCoin.name}</h2>
                      <p>{selectedCoin.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="selectedCoin-stat">Rank: {selectedCoin.market_cap_rank}</div>
                  <div className="selectedCoin-stat">High (24h): ${selectedCoin.high_24h?.toLocaleString()}</div>
                  <div className="selectedCoin-stat">Low (24h): ${selectedCoin.low_24h?.toLocaleString()}</div>
                  <div className="selectedCoin-stat">Total Supply: {selectedCoin.total_supply ? selectedCoin.total_supply.toLocaleString() : 'N/A'}</div>
                  <div className="selectedCoin-link">
                  <a href={`/test?coin=${encodeURIComponent(selectedCoin.symbol)}`} target="_blank" rel="noreferrer">
                  <GlitchingButton name={"more info"} aria={true}></GlitchingButton></a>
                  </div>
                </div>
                <div className='selectedCoin-details-graph'>
                <DataSeriesChart coinId={selectedCoin.name} days={30} />
                </div>
             </>
           ) : (
             <div className="coin-name">Select a Coin . . .</div>
           )}
         </div>
       </div>
   

    </div>
  );
}

export default CryptoInfo;
