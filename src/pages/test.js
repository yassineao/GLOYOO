import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CoinP.css';
import DataSeriesChart from '../components/CryptoCharts';
import GlitchLoader from '../components/loader';
import { fetchStockNews } from '../api/news';
import '../styles/font.css';
import '../styles/coiin.css';
import Caard from '../components/cardd';

function CoinP() {
  const [coin, setCoin] = useState('');
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Extract the 'coin' parameter from the URL query
    const params = new URLSearchParams(window.location.search);
    const paramValue = params.get('coin'); // Get the 'coin' query parameter
    setCoin(paramValue);
  }, []);

  // Function to fetch coin data
  const fetchCoinData = async (symbol) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/coin?symbol=${symbol}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching coin data from backend:', error.message);
      throw error;
    }
  };

  // Fetch coin data and news whenever `coin` updates
  useEffect(() => {
    if (!coin) return; // Avoid fetching if coin is not set
    setLoading(true); // Set loading to true before fetching
    const fetchData = async () => {
      try {
        const [data, articlesData] = await Promise.all([
          fetchCoinData(coin.toUpperCase()),
          fetchStockNews(coin),
        ]);
        setCoinData(data);
        setArticles(articlesData);
      } catch (error) {
        setError(error.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [coin]);

  if (loading) {
    return <GlitchLoader />;
  }

  if (error || !coinData) {
    return <div>Error loading coin data: {error}</div>;
  }

  // Destructure data for easier access
  const { info, quote } = coinData;
  const { name, symbol, logo, description, date_added, urls } = info;
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
  } = quote.quote.USD;

  const circulatingSupply = quote.circulating_supply;
  const totalSupply = quote.total_supply;
  const maxSupply = quote.max_supply || 'N/A';

  // Format date_added
  const formattedDate = new Date(date_added).toLocaleDateString();

  return (
    <div id="crypto-dashboard">
      <div className="coin-info-section">
        <img src={logo} alt={`${name} Logo`} className="coin-logo" />
        <div className="coin-header">
          <div className="coin-info">
            <div id="neon-container">
              <a className="neon5">
                {name} ({symbol})
              </a>
            </div>
            <p className="coin-price" id="coin-price">
              ${price.toFixed(2)}({percent_change_24h >= 0 ? '+' : ''}
                {percent_change_24h.toFixed(2)}%)
           
              
            </p>
            
          </div>
        </div>

        <div className="coin-description">
          <div id="neon-container">
            <h5>
              <a className="neon2">Description</a>
            </h5>
          </div>
          <p>{description}</p>
        </div>

        <div className="coin-stats">
          <div id="neon-container">
            <a className="neon2">Market Data</a>
          </div>
          {[
            { name: 'Market Cap', content: `$${market_cap.toLocaleString()}` },
            { name: '24h Volume', content: `$${volume_24h.toLocaleString()}` },
            { name: 'Circulating Supply', content: `${circulatingSupply.toLocaleString()} ${symbol}` },
            { name: 'Total Supply', content: `${totalSupply.toLocaleString()} ${symbol}` },
            {
              name: 'Max Supply',
              content: maxSupply !== 'N/A' ? `${maxSupply.toLocaleString()} ${symbol}` : 'N/A',
            },
            { name: 'Market Cap Dominance', content: `${market_cap_dominance.toFixed(2)}%` },
            {
              name: 'Fully Diluted Market Cap',
              content: `$${fully_diluted_market_cap.toLocaleString()}`,
            },
            { name: 'Volume Change 24h', content: `${volume_change_24h.toFixed(2)}%` },
          ].map((stat, index) => (
            <Caard key={index} name={stat.name} content={stat.content} />
          ))}
        </div>

        <div className="price-change-stats">
          <div id="neon-container">
            <h5>
              <a className="neon2">Price Change</a>
            </h5>
          </div>
          <div className="price-change-grid">
            {[
              { label: '1h', value: percent_change_1h },
              { label: '24h', value: percent_change_24h },
              { label: '7d', value: percent_change_7d },
              { label: '30d', value: percent_change_30d },
              { label: '60d', value: percent_change_60d },
              { label: '90d', value: percent_change_90d },
            ].map((change, index) => (
              <div className="price-change" key={index}>
                <p>
                  <strong>{change.label}:</strong> {change.value.toFixed(2)}%
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="coin-links">
          <div id="neon-container">
            <h5>
              <a className="neon2">Resources</a>
            </h5>
          </div>
          <ul>
            {urls.website && urls.website.length > 0 && (
              <li>
                <a href={urls.website[0]} target="_blank" rel="noopener noreferrer">
                  Official Website
                </a>
              </li>
            )}
            {/* Add other links as needed */}
          </ul>
        </div>
      </div>

      <div className="chart-section">
        <div id="neon-container">
          <a className="neon1">Price Chart in </a>
        </div>
        <div className="selectedCoin-details-graph">
          <DataSeriesChart coinId={coin} days={1} />
        </div>
      </div>

      <div className="news-section">
        <div id="neon-container">
          <div id="container">
            <a className="neon4">News</a>
          </div>
        </div>
        <ul className="news-list">
          {articles.map((article, index) => (
            <li key={index}>
              <div id="neon-container">
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="neon4">
                {article.title}
              </a>
        </div>
            
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CoinP;
