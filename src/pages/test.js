// src/CoinP.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CoinP.css'; // Optional: Create a CSS file for styling

import DataSeriesChart from '../components/CryptoCharts';
import GlitchLoader from '../components/loader';
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
    return <GlitchLoader></GlitchLoader>;
  }

  if (error || !coinData) {
    return <div>Error loading coin data.</div>;
  }

  // Destructure data for easier access
  const { info, quote } = coinData;
  const { name, symbol, logo, category, description, date_added, urls, tags } = info;
  const {
    price,
    volume_24h,
    volume_change_24h,
    percent_change_1h,
    percent_change_24h,
    percent_change_7d,
    percent_change_30d,
    percent_change_60d,
    percent_change_90d,
    market_cap,
    market_cap_dominance,
    fully_diluted_market_cap,
    last_updated,
  } = quote.quote.USD;

  const circulatingSupply = quote.circulating_supply;
  const totalSupply = quote.total_supply;
  const maxSupply = quote.max_supply || 'N/A';

  // Format date_added
  const formattedDate = new Date(date_added).toLocaleDateString();

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
              ${price.toFixed(2)}
            </p>
            <p
              className={`coin-change ${
                percent_change_24h >= 0 ? 'positive' : 'negative'
              }`}
              id="coin-change"
            >
              {percent_change_24h >= 0 ? '+' : ''}
              {percent_change_24h.toFixed(2)}%
            </p>
           
            <p className="date-added">
              <strong>Date Added:</strong> {formattedDate}
            </p>
          </div>
        </div>

        <div className="coin-description">
          <h2>Description</h2>
          <p>{description}</p>
        </div>

        <div className="coin-stats">
          <h2>Market Data</h2>
          <div className="stat-grid">
            <div className="stat">
              <h3>Market Cap</h3>
              <p id="market-cap">${market_cap.toLocaleString()}</p>
            </div>
            <div className="stat">
              <h3>24h Volume</h3>
              <p id="volume">${volume_24h.toLocaleString()}</p>
            </div>
            <div className="stat">
              <h3>Circulating Supply</h3>
              <p id="circulating-supply">
                {circulatingSupply.toLocaleString()} {symbol}
              </p>
            </div>
            <div className="stat">
              <h3>Total Supply</h3>
              <p id="total-supply">
                {totalSupply.toLocaleString()} {symbol}
              </p>
            </div>
            <div className="stat">
              <h3>Max Supply</h3>
              <p id="max-supply">
                {maxSupply !== 'N/A' ? maxSupply.toLocaleString() : 'N/A'} {symbol}
              </p>
            </div>
            <div className="stat">
              <h3>Market Cap Dominance</h3>
              <p id="market-cap-dominance">{market_cap_dominance.toFixed(2)}%</p>
            </div>
            <div className="stat">
              <h3>Fully Diluted Market Cap</h3>
              <p id="fully-diluted-market-cap">${fully_diluted_market_cap.toLocaleString()}</p>
            </div>
            <div className="stat">
              <h3>Volume Change 24h</h3>
              <p id="volume-change-24h">{volume_change_24h.toFixed(2)}%</p>
            </div>
          </div>
        </div>

        <div className="price-change-stats">
          <h2>Price Changes</h2>
          <div className="price-change-grid">
            <div className="price-change">
              <p><strong>1h:</strong> {percent_change_1h.toFixed(2)}%</p>
            </div>
            <div className="price-change">
              <p><strong>24h:</strong> {percent_change_24h.toFixed(2)}%</p>
            </div>
            <div className="price-change">
              <p><strong>7d:</strong> {percent_change_7d.toFixed(2)}%</p>
            </div>
            <div className="price-change">
              <p><strong>30d:</strong> {percent_change_30d.toFixed(2)}%</p>
            </div>
            <div className="price-change">
              <p><strong>60d:</strong> {percent_change_60d.toFixed(2)}%</p>
            </div>
            <div className="price-change">
              <p><strong>90d:</strong> {percent_change_90d.toFixed(2)}%</p>
            </div>
          </div>
        </div>

        <div className="coin-links">
          <h2>Resources</h2>
          <ul>
            {urls.website && urls.website.length > 0 && (
              <li>
                <a href={urls.website[0]} target="_blank" rel="noopener noreferrer">
                  Official Website
                </a>
              </li>
            )}
            {urls.explorer && urls.explorer.length > 0 && (
              <li>
                <a href={urls.explorer[0]} target="_blank" rel="noopener noreferrer">
                  Explorer
                </a>
              </li>
            )}
            {urls.technical_doc && urls.technical_doc.length > 0 && (
              <li>
                <a href={urls.technical_doc[0]} target="_blank" rel="noopener noreferrer">
                  Whitepaper
                </a>
              </li>
            )}
            {urls.twitter && urls.twitter.length > 0 && (
              <li>
                <a href={urls.twitter[0]} target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
            )}
            {urls.reddit && urls.reddit.length > 0 && (
              <li>
                <a href={urls.reddit[0]} target="_blank" rel="noopener noreferrer">
                  Reddit
                </a>
              </li>
            )}
            {urls.message_board && urls.message_board.length > 0 && (
              <li>
                <a href={urls.message_board[0]} target="_blank" rel="noopener noreferrer">
                  Message Board
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* You can keep the chart and news sections as they are or update them if needed */}
      <div className="chart-section">
        <h2>Price Chart (7 Days)</h2>
        
        <div className='selectedCoin-details-graph'>
                <DataSeriesChart coinId={"weth"} days={30} />
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
          {/* Add more news items or fetch them dynamically */}
        </ul>
      </div>
    </div>
  );
}

export default CoinP;
