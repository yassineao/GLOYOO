import React from 'react';

import '../styles/Navbar.css';// Optional: Create a CSS file for styling

const Navbar = () => {
  return (
    <nav id="cyberpunk-nav">
        <div class="logo">
            <a href="/">GLOYOO</a>
        </div>
        <ul>
            <li><a href="/news">News</a></li>
            <li><a href="/coin">Coins</a></li>
            <li><a href="/test">test</a></li>
            <li><a href="/Login">Login</a></li>
        </ul>
    </nav>
  );
};

export default Navbar;
