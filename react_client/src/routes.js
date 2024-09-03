import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginView from './views/login_view';
import SignupView from './views/signup_view';
import HomeView from './views/home_view';
import {jwtDecode} from 'jwt-decode';
const login_view = <LoginView/>
const signup_view = <SignupView/>
const home_view = <HomeView/>

const check_token_expired = (token) => {
  try {
    if(!token)
      return true; // If token is not provided, treat it as expired
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    return decodedToken.exp < currentTime;
  } catch (error) {
    // If token is not valid, treat it as expired
    return true;
  }
}

function RoutesApp() {
  return (
    <Router>
      <Routes>
  
        <Route path="" element={<Navigate to="/login" />} />
        <Route 
          path="/login" 
          element={
            check_token_expired(sessionStorage.getItem('access_token')) 
              ? login_view 
              : <Navigate to="/home" />
          } 
        />
        {/* Signup route */}
        <Route path="/signup" element={
            check_token_expired(sessionStorage.getItem('access_token')) 
              ? signup_view 
              : <Navigate to="/home" />
          } />
        {/* Home route */}
        <Route path="/home" element={
            check_token_expired(sessionStorage.getItem('access_token')) 
              ? <Navigate to="/login" />
              : home_view
          } />
      </Routes>
    </Router>
  );
}

export default RoutesApp;