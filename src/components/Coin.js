// Coin.js
import React from 'react';

const Coin = ({ coin }) => {
    
    console.log("adssssssssssss",coin)
  return (
    <tr key={coin.key}>
      <td><img src={coin.logo} alt={coin.name} /></td>
      <td>{coin.name}</td>
      <td>{coin.symbol}</td>
      <td>Rank: {coin.rank}</td>
      <td>High (24h): ${coin.high24h}</td>
      <td>Low (24h): ${coin.low24h}</td>
      <td>Total Supply: {coin.totalSupply}</td>
      <td><a href={coin.external_link} target="_blank" rel="noreferrer">View on CoinMarketCap</a></td>
    </tr>
  );
};

export default Coin;
