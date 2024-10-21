import React from 'react';
import '../styles/Cardo.css'; // Import the CSS file

const Card = ({ title, content, linkUrl }) => {
  return (
    <a href={linkUrl} target="_blank" rel="noopener noreferrer" id="my-card-container" style={{ textDecoration: 'none' }}>
      <div id="my-card">
        <div className="front-content">
          <p>{title}</p>
        </div>
        <div className="content">
          <p className="heading">Card Hover</p>
          <p>{content}</p>
        </div>
      </div>
    </a>
  );
};

export default Card;