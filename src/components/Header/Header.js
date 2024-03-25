// Header.js
import React from "react";
import { useSelector} from "react-redux";
import { selectIsLoggedIn} from '../../Authentication/authSlice'
import "./Header.css";

const Header = () => {


 const mail = localStorage.getItem('userEmail') || ''
  const isLoggedIn = useSelector(selectIsLoggedIn);

 

  return (
    <div className="navbar">
      <div className="div1">
        <h1>Mail Box</h1>
      </div>

      {isLoggedIn && (

      <div className="div2">
        <p className="button">
          {mail}
        </p>
      </div>
      )}
    </div>
  
  );
};

export default Header;

