// src/components/Coin.js
import React from 'react';

const Coin = ({ coin }) => (
  <tr key={coin.id}>
    <td><img src={coin.image} alt={coin.name} width="25" /></td>
    <td>{coin.name}</td>
    <td>{coin.symbol.toUpperCase()}</td>
    <td>Rank: {coin.market_cap_rank}</td>
    <td>High (24h): ${coin.high_24h?.toLocaleString()}</td>
    <td>Low (24h): ${coin.low_24h?.toLocaleString()}</td>
    <td>Total Supply: {coin.total_supply ? coin.total_supply.toLocaleString() : 'N/A'}</td>
    <td><a href={`https://www.coingecko.com/en/coins/${coin.id}`} target="_blank" rel="noreferrer">View on CoinGecko</a></td>
  </tr>
);

export default Coin;
