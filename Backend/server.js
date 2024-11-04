// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios'); // Don't forget to import axios

const authRoutes = require('./routes/authRoutes');
const authenticateToken = require('./middleware/authenticateToken');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);  // Exit the process if the database connection fails
  });

// Routes
app.use('/api/auth', authRoutes);

// Example of protected route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.username}! This is a protected route.` });
});

// CoinMarketCap API key from environment variable
const API_KEY = '3a1e40df-6617-4305-8439-5eaf717da03b'; // Make sure to set CMC_API_KEY in your .env file

// Route to fetch coin data
app.get('/api/coin', async (req, res) => {
  const symbol = req.query.symbol || 'BTC';
  try {
    const [infoResponse, quoteResponse] = await Promise.all([
      axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/info', {
        headers: {
          'X-CMC_PRO_API_KEY': API_KEY,
        },
        params: { symbol },
      }),
      axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest', {
        headers: {
          'X-CMC_PRO_API_KEY': API_KEY,
        },
        params: { symbol },
      }),
    ]);

    res.json({
      info: infoResponse.data.data[symbol],
      quote: quoteResponse.data.data[symbol],
    });
  } catch (error) {
    console.error('Error fetching data from CoinMarketCap API:', error.message);
    res.status(500).json({ error: 'Error fetching data from CoinMarketCap API' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
