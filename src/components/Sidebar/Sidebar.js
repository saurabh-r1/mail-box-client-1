import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  console.log('Current URL:', location.pathname);
  
  return (
    <nav id="sidebar">
      <NavLink to="/" className="navLink" >
        Compose
      </NavLink>
      <NavLink to="/inbox"  className="navLink">
        Inbox
        <button className='count'>0</button>
      </NavLink>
      <NavLink to="/sent"  className="navLink">
        Sent Mail
      </NavLink>
    </nav>
  );
};

export default Sidebar;