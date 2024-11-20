// Home.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import GlitchingButton from '../components/glitchingButton';
import GlitchLoader from '../components/loader';
import Carousel from '../components/news';
import { fetchStockNews } from '../api/news';
import '../styles/home.css';
import '../styles/table.css'; // Import the updated CSS

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slides, setSlides] = useState(null);
  const [coins, setCoins] = useState([]);
  const navigate = useNavigate();
  const handleRowClick = (symbol) => {
    navigate(`/test?coin=${encodeURIComponent(symbol)}`);
  };
  useEffect(() => {
    const getNews = async () => {
      try {
        const articles = await fetchStockNews('Crypto Coins');
        const slidesData = articles.slice(0, 3).map((article) => ({
          imageSrc: article.urlToImage,
          altText: article.title,
          title: article.title,
          tag: 'News',
          linkText: 'find out more',
          linkIcon: 'arrow',
          linkUrl: article.url,
        }));

        setSlides(slidesData);
        // Don't set loading to false here; wait until both data are fetched
      } catch (err) {
        setError('Failed to fetch news');
      }
    };

    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 6,
              page: 1,
            },
          }
        );
        setCoins(response.data);
        // Don't set loading to false here; wait until both data are fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch coin data');
      }
    };

    // Fetch both data in parallel
    Promise.all([getNews(), fetchCoins()]).then(() => {
      setLoading(false); // Set loading to false after both fetches are complete
    });
  }, []);

  if (loading) {
    return <GlitchLoader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Carousel slides={slides} />
      <section id="dashboard-section">
        <GlitchingButton name="united" />
      </section>
      <div id="neon-container">
        <div id="cyberpunk-table-container">
          <table id="cyberpunk-table">
            <caption>Coins</caption>
            <thead>
              <tr>
                <th>Icon</th>
                <th>Name</th>
                <th>High (24h)</th>
                <th>Low (24h)</th>
                <th>Total Supply</th>
              </tr>
            </thead>
            <tbody >
              
              {coins.map((selectedCoin) => (
               <tr
               key={selectedCoin.id}
               onClick={() => handleRowClick(selectedCoin.symbol)}
               className="clickable-row"
             >
                <td>
                    <img
                      src={selectedCoin.image}
                      alt={selectedCoin.name}
                      width="40"
                    />
                    
                  </td>
                  <td>
                    <h2>{selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})</h2>
                  </td>
                  <td>${selectedCoin.high_24h?.toLocaleString()}</td>
                  <td>${selectedCoin.low_24h?.toLocaleString()}</td>
                  <td>
                    {selectedCoin.total_supply
                      ? selectedCoin.total_supply.toLocaleString()
                      : 'N/A'}
                  </td>
                </tr>
             
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5">Footer Content</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
