import React from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #e0f7fa; /* Sea blue theme background */
`;

const LoginForm = styled.div`
  background-color: white;
  padding: 50px ;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  width: 20%;
`;

const Title = styled.h2`
  text-align: center;
  color: #00796b; /* Sea blue theme text color */
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100% ;
  padding: 15px 0px 15px 0px;
  margin: 10px 0px 10px 0px;
  border: 1px solid #b2dfdb;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  
  width: 100%;
  padding: 15px;
  background-color: #00796b; /* Sea blue theme button color */
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #004d40; /* Darker shade on hover */
  }
`;

const SignUpLink = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #555;
`;

const Link = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
export {LoginContainer, LoginForm, Title, Input, Button, SignUpLink, Link}