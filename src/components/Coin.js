// src/components/Coin.js
import React from 'react';

const Coin = ({ coin }) => (
  <div className="coin-details-container">
      <div className="coin-details-header">
        <img src={coin.image} alt={coin.name} width="40" />
        <div className="coin-name-symbol">
          <h2>{coin.name}</h2>
          <p>{coin.symbol.toUpperCase()}</p>
        </div>
      </div>
      <div className="coin-stat">Rank: {coin.market_cap_rank}</div>
      <div className="coin-stat">High (24h): ${coin.high_24h?.toLocaleString()}</div>
      <div className="coin-stat">Low (24h): ${coin.low_24h?.toLocaleString()}</div>
      <div className="coin-stat">Total Supply: {coin.total_supply ? coin.total_supply.toLocaleString() : 'N/A'}</div>
      <div className="coin-link">
        <a href={`https://www.coingecko.com/en/coins/${coin.id}`} target="_blank" rel="noreferrer">View on CoinGecko</a>
      </div>
    </div>
);

export default Coin;
