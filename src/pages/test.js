// src/CoinP.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CoinP.css'; // Optional: Create a CSS file for styling

function CoinP() {
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCoinData = async (coinSymbol) => {
    const symbol = coinSymbol.toUpperCase();
    try {
      const response = await axios.get(`http://localhost:5000/api/coin?symbol=${symbol}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching coin data from backend:', error.message);
      throw error;
    }
  };

  useEffect(() => {
    const getCoinData = async () => {
      try {
        const data = await fetchCoinData('BTC');
        setCoinData(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    getCoinData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !coinData) {
    return <div>Error loading coin data.</div>;
  }

  const { info, quote } = coinData;
  const { name, symbol, logo } = info;
  const price = quote.quote.USD.price.toFixed(2);
  const percentChange24h = quote.quote.USD.percent_change_24h.toFixed(2);
  const marketCap = quote.quote.USD.market_cap.toFixed(2);
  const volume24h = quote.quote.USD.volume_24h.toFixed(2);
  const circulatingSupply = quote.circulating_supply;
  const maxSupply = quote.max_supply || 'N/A';

  return (
    <div id="crypto-dashboard">
      <div className="coin-info-section">
        <div className="coin-header">
          <img src={logo} alt={`${name} Logo`} className="coin-logo" />
          <div className="coin-info">
            <h1 id="coin-name">
              {name} ({symbol})
            </h1>
            <p className="coin-price" id="coin-price">
              ${price}
            </p>
            <p
              className={`coin-change ${
                percentChange24h >= 0 ? 'positive' : 'negative'
              }`}
              id="coin-change"
            >
              {percentChange24h >= 0 ? '+' : ''}
              {percentChange24h}%
            </p>
          </div>
        </div>

        <div className="coin-stats">
          <div className="stat">
            <h2>Market Cap</h2>
            <p id="market-cap">${marketCap}</p>
          </div>
          <div className="stat">
            <h2>24h Volume</h2>
            <p id="volume">${volume24h}</p>
          </div>
          <div className="stat">
            <h2>Circulating Supply</h2>
            <p id="supply">
              {circulatingSupply} {symbol}
            </p>
          </div>
          <div className="stat">
            <h2>Max Supply</h2>
            <p id="max-supply">
              {maxSupply} {symbol}
            </p>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <h2>Price Chart (7 Days)</h2>
        <div id="chart-placeholder">
          <p>Chart will appear here</p>
        </div>
      </div>

      <div className="news-section">
        <h2>Latest News</h2>
        <ul className="news-list">
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Bitcoin price surges as market rallies.
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Why investors are excited about BTC's future.
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Expert analysis on Bitcoin's 2024 outlook.
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Bitcoin adoption grows globally.
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Top 5 trends in cryptocurrency for 2024.
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CoinP;
