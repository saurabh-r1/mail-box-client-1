import React, { useEffect } from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import './Sidebar.css';

import { logout } from '../../Authentication/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = () => {
  const dispatch = useDispatch();
  const unreadCount = useSelector(state => state.inbox.unreadCount);
  const navigate = useNavigate ();
  
  useEffect(() => {
    // You may dispatch an action to fetch the unread count initially when the Sidebar mounts
    // Dispatch an action to fetch unread count
  }, [dispatch]);

  const handleLogout = () => {
    navigate('/')
    dispatch(logout());

  };

 
  
  return (
    <nav id="sidebar">
      <NavLink to="/compose" className="navLink" >
        Compose
      </NavLink>
      <NavLink to="/"  className="navLink">
        Inbox
        <button className='count'>{unreadCount}</button> 
      </NavLink>
      <NavLink to="/sent"  className="navLink">
        Sent Mail
      </NavLink>
      <button className='logout' onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Sidebar;
