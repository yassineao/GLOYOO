import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GlitchingButton from '../components/glitchingButton';
import GlitchLoader from '../components/loader';
import Carousel from '../components/news';
import { fetchStockNews } from '../api/news';
import '../styles/home.css';// Optional: Create a CSS file for styling

import '../styles/font.css'; // Optional: Create a CSS file for styling
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slides, setSlides] = useState(null);
  // Fetch stock news when the component mounts
  useEffect(() => {
    const getNews = async () => {
      try {
        const articles = await fetchStockNews("stocks"); // Call the API function
        const slidesData = articles.slice(0, 3).map(article => ({
          imageSrc: article.urlToImage,
          altText: article.title,
          title: article.title,
          tag: "News", // You can adjust this based on the article type if available
          linkText: "find out more",
          linkIcon: "arrow",
          linkUrl: article.url // Provide the actual URL for more information
        }));
  
        setSlides(slidesData);
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError('Failed to fetch news');
        setLoading(false);
      }
    };
  
    getNews();
  }, []);
  

  // If loading, show a loading message
  if (loading) {
    return <GlitchLoader></GlitchLoader>;
  }

  // If there's an error, show the error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div >
      
        <Carousel slides={slides} ></Carousel>
         <section id="dashboard-section">
        
         <GlitchingButton name={"united"}></GlitchingButton>
         </section>
         <div id="neon-container">
  <div id="container">
    <a href="#">Neon 1</a>
    <a href="#">Neon 2</a>
    <a href="#">Neon 3</a>
    <a href="#">Neon 4</a>
    <a href="#">Neon 5</a>
    <a href="#">Neon 6</a>
  </div>
</div>
    </div>
  );
};

export default Home;
