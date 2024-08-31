import React from 'react';
import styled from 'styled-components';
const SignUpContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #e0f7fa; /* Sea blue theme background */
`;

const SignUpForm = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items horizontally */

  
`;

const Title = styled.h2`
  text-align: center;
  color: #00796b; /* Sea blue theme text color */
  margin-bottom: 20px;

  @media (max-width: 600px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #b2dfdb;
  border-radius: 5px;
  font-size: 16px;
  @media (max-width: 600px) {
    width: 90%;
    padding: 12px;
    font-size: 14px;
  }
 
`;

const Textarea = styled.textarea`
  display:block;
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #b2dfdb;
  border-radius: 5px;
  font-size: 16px;
  resize: vertical;

  @media (max-width: 600px) {
    width: 90%;
    padding: 12px;
    font-size: 14px;
  }
`;

const Select = styled.select`
  display:block;
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #b2dfdb;
  border-radius: 5px;
  font-size: 16px;

  @media (max-width: 600px) {
    width: 90%;
    
    font-size: 14px;
  }
`;

const Button = styled.button`
  display:block;
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

  @media (max-width: 600px) {
    padding: 12px;
    font-size: 14px;
  }
`;

const FieldsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 5%; /* Space between the first and last name fields */
  margin: 0;
  padding: 0 30px;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0;
    
  }
`;

const NameInput = styled(Input)`
  flex: 1; /* Make inputs take up equal space */
  @media (max-width: 600px) {
    padding: 15px;
    margin: 10px 0;
  }
`;

export {SignUpContainer, SignUpForm, Title, Input, Button, Textarea, Select, FieldsContainer, NameInput}