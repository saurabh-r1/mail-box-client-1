import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";

// import {  useNavigate } from 'react-router-dom';
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { login, selectIsLoggedIn } from "./authSlice";

import "./Login.css";

const SignUp = () => {
  const dispatch = useDispatch();

  //   const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef(null);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [isLoading, setIsLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    // Redirect to the welcome page if already logged in
    if (isLoggedIn) {
      //   navigate('/');
    }
  }, [isLoggedIn]);

  const submitHandler = async (event) => {
    event.preventDefault();

    const confirmPassword = confirmPasswordRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Check if passwords match
    if (enteredPassword === confirmPassword) {
      console.log("Passwords match");
    } else {
      console.log("Passwords do not match");
      setPasswordMatch(false);
    }

    setIsLoading(true);

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC584wY39oSVJTRlG43GwxU5TzuN2uQvpU`;

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

  return (
    <div>
      <Container className="mt-5">
        <div className="login-container">
          <h2 className="login-header">Sign Up</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Control
                type="email"
                placeholder="Email"
                required
                ref={emailInputRef}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Control
                type="password"
                placeholder="Password"
                required
                ref={passwordInputRef}
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                ref={confirmPasswordRef}
              />
              {!passwordMatch && (
                <Alert variant="danger">Passwords do not match</Alert>
              )}
            </Form.Group>

            <div>
              {!isLoading && <Button type="submit">CREATE ACCOUNT</Button>}

              {isLoading && <p className="loading">Sending request....</p>}
            </div>
          </Form>
        </div>
      </Container>
      <div>
        
      </div>
    </div>
  );
};

export default SignUp;
