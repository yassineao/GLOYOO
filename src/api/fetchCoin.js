import axios from 'axios';

const API_KEY = '3a1e40df-6617-4305-8439-5eaf717da03b'; // Replace with your actual API key

export async function fetchSingleCoin(coinSymbol) {
  const symbol = coinSymbol.toUpperCase();
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/info', {
      headers: {
        "X-CMC_PRO_API_KEY" : "3a1e40df-6617-4305-8439-5eaf717da03b"
      },
      params: {
        symbol: symbol,
      },
    });
    console.log("Response:", response);
    const data = response.data.data;
    const coinId = Object.keys(data)[0];
    return data[coinId];
  } catch (error) {
    console.error('Error fetching coin data:', error);
    return null;
  }
}
