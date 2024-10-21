import React from 'react';
import '../styles/sidebar.css'; // Optional: Create a CSS file for styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><a href="#twitter">Twitter</a></li>
        <li><a href="#facebook">Facebook</a></li>
        <li><a href="#instagram">Instagram</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
