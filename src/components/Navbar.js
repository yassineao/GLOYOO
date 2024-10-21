import React from 'react';

import '../styles/Navbar.css';// Optional: Create a CSS file for styling

const Navbar = () => {
  return (
    <nav id="cyberpunk-nav">
        <div class="logo">
            <a href="#">GLOYOO</a>
        </div>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Gallery</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </nav>
  );
};

export default Navbar;
