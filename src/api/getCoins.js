// api.js
import axios from 'axios';

const API_KEY = '6f9a417b3emsh6470c08e76207e8p1483c3jsn1ebaa39b977e';
const API_HOST = 'cryptocurrency-markets.p.rapidapi.com';

export const fetchCryptoData = async (page) => {
    
  const options = {
    method: 'GET',
    url: 'https://cryptocurrency-markets.p.rapidapi.com/v1/crypto/coins',
    params: { page: '1' },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST,
    },
  };

  try {
    
    const response = await axios.request(options);
    
    return Object.values(response.data.data);
  } catch (error) {
    
    console.log("adssssssseeeeee")
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
