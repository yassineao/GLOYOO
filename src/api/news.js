// Import axios
import axios from 'axios';

// Your API Key and the base URL
const API_KEY = 'a8c124791ca0485b812ff6b1790ea63f';
const API_URL = 'https://newsapi.org/v2/everything';

// Function to fetch stock news from NewsAPI
export const fetchStockNews = async (query) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        q: query, // Query term for stock news
        language: 'en', // Language filter
        sortBy: 'relevancy', // Sort news by relevancy
        apiKey: API_KEY, // Your API Key
      },
    });

    // Return the articles array from the response
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching stock news:', error);
    throw error; // Re-throw error to handle in the calling component
  }
};
