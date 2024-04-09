// Login.js
import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
// import {  useNavigate } from 'react-router-dom';
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { login, selectIsLoggedIn } from "./authSlice";

import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();

  //   const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const isLoggedIn = useSelector(selectIsLoggedIn);

//   const [isLoginPage, setIsLoginPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  useEffect(() => {
    // Redirect to the welcome page if already logged in
    if (isLoggedIn) {
      //   navigate('/');
    }
  }, [isLoggedIn]);

//   const toggle = () => {
//     setIsLoginPage(!isLoginPage);
//   };

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC584wY39oSVJTRlG43GwxU5TzuN2uQvpU`;
    

    try {
      const response = await axios.post(url, {
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      });

      dispatch(
        login({ token: response.data.idToken, userEmail: response.data.email })
      );

      //   navigate('/expense-tracker');
    } catch (error) {
      alert(error.message || "Authentication failed!");
    }

    setIsLoading(false);
  };

  const forgotPasswordHandler = async () => {
    const enteredEmail = emailInputRef.current.value;

    try {
      await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC584wY39oSVJTRlG43GwxU5TzuN2uQvpU`,
        {
          email: enteredEmail,
          requestType: "PASSWORD_RESET",
        }
      );

      alert(
        "Password reset email sent successfully. Check your email for instructions."
      );
      toggleForgotPassword(); // Switch back to the login screen after sending the reset email
    } catch (error) {
      let errorMessage = "Password reset failed!";
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.message
      ) {
        errorMessage = error.response.data.error.message;
      }
      alert(errorMessage);
    }
  };

  return (
    <div>
      <Container className="mt-5">
        <div className="login-container">
          <h2 className="login-header">
            {isForgotPassword
              ? "Forgot Password"
                : "Login"
            }
              
          </h2>
          <Form
            onSubmit={isForgotPassword ? forgotPasswordHandler : submitHandler}
          >
            <Form.Group controlId="email">
              <Form.Control type="email" placeholder="Email" required ref={emailInputRef} />
            </Form.Group>

            {!isForgotPassword && (
              <Form.Group controlId="password">
                <Form.Control type="password" placeholder="Password" required ref={passwordInputRef} />
              </Form.Group>
            )}

            

          
            {!isForgotPassword && (
              <div className="mb-3">
                <Button variant="link" onClick={toggleForgotPassword}>
                  Forgot Password?
                </Button>
              </div>
            )}

            <div>
              {!isLoading && !isForgotPassword && (
                <Button type="submit"> LOGIN</Button>
                
              )}
              {!isLoading && isForgotPassword && (
                <Button type="submit">Reset Password</Button>
              )}
              {isLoading && <p className="loading">Sending request....</p>}
            </div>
          </Form>
        </div>
      </Container>
    
    </div>
  );
};

export default Login;
