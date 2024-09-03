import React, { useState } from 'react';
import { login } from '../controllers/login_controller';
import {LoginContainer, LoginForm, Title, Input, Button, SignUpLink, Link} from "../styles/login_styles"

const LoginView = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  

  const loginClick = async (e) => {
    e.preventDefault();
    if (!email ||!password) 
    {
        alert('Please fill in both email and password.');
        return;
    }
    else
    {
        const respones = await login(email, password);
        
        if(respones.status == 200)
        {
            alert(respones.data["message"]);
            window.location.href = '/home';
        }
        
    }
  };
  return (
    <LoginContainer>
      <LoginForm>
        <Title>Welcome to Legal Miracle!</Title>
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" onClick={loginClick} >Login</Button>
        <SignUpLink>
          Don’t have an account? <Link href="/signup">Sign Up</Link>
        </SignUpLink>
      </LoginForm>
    </LoginContainer>
  );

  
};

export default LoginView;