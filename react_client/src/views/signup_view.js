import {SignUpContainer, SignUpForm, Title, Input, Button, SignUpLink, Link, Select, Textarea, FieldsContainer, NameInput} from "../styles/signup_styles"
import { useState } from "react";
import { signup } from "../controllers/signup_controller";


const SignupView = () => {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        date_of_birth: '',
        address: '',
        gender: '',
        password: '',
        password_confirm: '',
      });
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const signupClick = async (e) => {
        e.preventDefault();
        if (
            !formData.first_name ||
            !formData.last_name ||
            !formData.email ||
            !formData.phone_number ||
            !formData.date_of_birth ||
            !formData.address ||
            !formData.gender ||
            !formData.password ||
            !formData.password_confirm
          ) 
        {
            alert('Please fill in all fields.');
            return;
        }
        else if(formData.password !== formData.password_confirm) 
            alert('Password do not match ! Please try again');
        else
        {
            const respones = await signup(formData)
           
            if(respones.status == 200)
            {
                alert(respones.data["message"]);
                window.location.href = '/login';
            }
            
        }
        
    };
    

    return (
        <SignUpContainer>
          <SignUpForm>
            <Title>Sign Up for Focus!</Title>
              <FieldsContainer>
                  <NameInput
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                  <NameInput
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
              </FieldsContainer>
              <FieldsContainer>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FieldsContainer>
              <FieldsContainer>
                <Input
                  type="tel"
                  name="phone_number"
                  placeholder="Phone Number"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </FieldsContainer>
              <FieldsContainer>
                <Input
                  type="date"
                  name="date_of_birth"
                  placeholder="Date of Birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                />
              </FieldsContainer>
              <FieldsContainer>
                <Textarea
                  name="address"
                  placeholder="Address"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                />
              </FieldsContainer>
              <FieldsContainer>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </FieldsContainer>
              <FieldsContainer>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </FieldsContainer>
              <FieldsContainer>
                <Input
                  type="password"
                  name="password_confirm"
                  placeholder="Confirm Password"
                  value={formData.password_confirm}
                  onChange={handleChange}
                />
              </FieldsContainer>
              <FieldsContainer>
                <Button type="submit" onClick={signupClick}>Sign Up</Button>
              </FieldsContainer>
          </SignUpForm>
        </SignUpContainer>
      );
    };
    
  
  export default SignupView ;