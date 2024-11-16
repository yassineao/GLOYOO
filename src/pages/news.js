import React, { useEffect, useState } from 'react';
import Card from '../components/card';
import GlitchLoader from '../components/loader';

import GlitchingButton from '../components/glitchingButton';
import { fetchStockNews } from '../api/news';
import '../styles/home.css'; // Optional: Create a CSS file for styling

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  // Fetch stock news when the component mounts
  useEffect(() => {
    const getNews = async () => {
      try {
        const articles = await fetchStockNews("stocks"); // Call the API function
        setArticles(articles); // Save the articles data
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    getNews();
  }, []);

  // Helper function to truncate the title
  const truncateTitle = (title, maxLength = 50) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  // If loading, show a loading message
  if (loading) {
    return <GlitchLoader></GlitchLoader>;
  }

  // If there's an error, show the error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 id="titel">News</h1>
      <div id="card-container">
        {articles.map((article, index) => (
          <Card
            key={index} // Unique key for each item in the list
            title={truncateTitle(article.title)} // Pass truncated title to Card
            content={article.description || article.content} // Use description or content
            linkUrl={article.url} // Optionally pass link to the full article
          />
        ))}
      </div>
      <GlitchingButton name={"united"} />
    </div>
  );
};

export default Home;
