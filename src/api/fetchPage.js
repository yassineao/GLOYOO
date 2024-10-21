import axios from 'axios';

const API_URL = 'https://cryptocurrency-markets.p.rapidapi.com/v1/crypto/coins';
const API_HEADERS = {
  'x-rapidapi-key': '6f9a417b3emsh6470c08e76207e8p1483c3jsn1ebaa39b977e',
  'x-rapidapi-host': 'cryptocurrency-markets.p.rapidapi.com',
};

export const fetchCryptoData = async (page = 1) => {
  const options = {
    method: 'GET',
    url: API_URL,
    params: { page },
    headers: API_HEADERS,
  };

  try {
    const { data } = await axios.request(options);
    return Object.values(data.data); // Extract and return the data array
  } catch (error) {
    console.error('Error fetching crypto data:', error.message);
    throw error; // Re-throw the error for the calling function to handle
  }
};
