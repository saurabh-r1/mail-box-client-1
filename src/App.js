import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Compose from "./components/mail/Compose";
import Inbox from "./components/mail/Inbox";
import SentMail from "./components/mail/SentMail";
import { selectIsLoggedIn } from './Authentication/authSlice';
import { useSelector } from "react-redux";
import ToogleLoginSignUp from "./Authentication/ToggleLoginSignUp";

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <Header />
      {isLoggedIn ? (
        <Router>
          <div className="app">
            <div className="row">
              <div className="col-2">
                
                  <Sidebar />
                
              </div>
              <div className="col-9 mt-4">
                <Routes>
                  <Route path="/" element={<Compose />} />
                  <Route path="/inbox" element={<Inbox />} />
                  <Route path="/sent" element={<SentMail />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      ) : (
        <ToogleLoginSignUp />
      )}
    </>
  );
}

export default App;
