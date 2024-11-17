import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CoinP.css'; // Optional: Create a CSS file for styling
import Radio from '../components/Radio';
import DataSeriesChart from '../components/CryptoCharts';
import GlitchLoader from '../components/loader';
import { fetchStockNews } from '../api/news';
import '../styles/font.css'; // Optional: Create a CSS file for styling

function CoinP() {
  const [selectedValue, setSelectedValue] = useState('valueIs-1'); // Default value

  const [coin, setCoin] = useState('');
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [articles, setArticles] = useState([]);
  const handleValueChange = (newValue) => {
    setSelectedValue(newValue); // Update value from Radio component
  };
  useEffect(() => {
    // Extract the 'coin' parameter from the URL query
    const params = new URLSearchParams(window.location.search);
    const paramValue = params.get('coin'); // Get the 'coin' query parameter
    setCoin(paramValue);
  }, []);
  useEffect(() => {
   
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

  // Fetch coin data whenever `coin` updates
  useEffect(() => {
    if (!coin) return; // Avoid fetching if coin is not set
    setLoading(true); // Set loading to true before fetching
    const getCoinData = async () => {
      try {
        const data = await fetchCoinData(coin.toUpperCase());
        setCoinData(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    getCoinData();
    const getNews = async () => {
      try {
        const articles = await fetchStockNews(coin); // Call the API function
        setArticles(articles); // Save the articles data
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    getNews();
  }, [coin]); // Dependency on `coin`

  if (loading) {
    return <GlitchLoader />;
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
        
      <img src={logo} alt={`${name} Logo`} className="coin-logo" />
        <div className="coin-header">
          <div className="coin-info">
            <h1 id="coin-name">
              {name} ({symbol})
            </h1>
            <p className="coin-price" id="coin-price">
              ${price.toFixed(2)}
            </p>
            <p
              className={`coin-change ${percent_change_24h >= 0 ? 'positive' : 'negative'}`}
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
            {/* Other links */}
          </ul>
        </div>
      </div>

      <div className="chart-section">
      <div id="neon-container">
  <a  class="neon1">Price Chart in </a>
    <a  class="neon2">{selectedValue}</a>
    <Radio selectedValue={selectedValue} onChange={handleValueChange} />

</div>

      
        <div className="selectedCoin-details-graph">
          <DataSeriesChart coinId={coin} days={30} />
        </div>
      </div>

      <div className="news-section">
      <div id="neon-container">
  <div id="container">
    <a  class="neon4">News</a>
  </div>
</div>
        <ul className="news-list">
          <li>
            
          </li>
          {articles.map((article, index) => (
            
            <li>
              
              <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
          </a>
             </li>
          
        ))}
          {/* Additional news items */}
        </ul>
      </div>
    </div>
  );
}

export default CoinP;
