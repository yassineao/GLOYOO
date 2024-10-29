import React from 'react';
import '../styles/loader.css'; // Assuming CSS is external

const GlitchLoader = () => {
  return (
    <div id="glitch-loader">
      <div data-glitch="Loading..." className="glitch">Loading...</div>
    </div>
  );
};

export default GlitchLoader;
