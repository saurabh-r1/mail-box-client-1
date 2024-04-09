import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Compose from "./components/mail/Compose/Compose";
import Inbox from "./components/mail/Inbox/Inbox";
import SentMail from "./components/mail/SentMail/SentMail";
import { selectIsLoggedIn } from "./Authentication/authSlice";
import { useSelector } from "react-redux";
import ToogleLoginSignUp from "./Authentication/ToggleLoginSignUp";
import EmailDetail from "./components/mail/EmailDetails/EmailDetail";

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <Header />
      {isLoggedIn ? (
        <Router>
          <div>
            <div className="row">
              <div className="col-3">
                <Sidebar />
              </div>
              <div className="col-9 mt-0">
                <Routes>
                  <Route path="/compose" element={<Compose />} />
                  <Route path="/" element={<Inbox />} />
                  <Route path="/sent" element={<SentMail />} />
                  <Route path="/email/:id" element={<EmailDetail />} />
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
