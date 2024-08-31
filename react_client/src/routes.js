import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginView from './views/login_view';
import SignupView from './views/signup_view';
import HomeView from './views/home_view';
const login_view = <LoginView/>
const signup_view = <SignupView/>
const home_view = <HomeView/>

const RoutesApp = () => (
  <Router>
    <Routes>
      <Route path="/login" element={login_view} />
      <Route path="/signup" element={signup_view} />
      <Route path="/home" element={home_view} />

    </Routes>
  </Router>
);

export default RoutesApp;