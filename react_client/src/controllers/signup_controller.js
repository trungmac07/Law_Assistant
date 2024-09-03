import { post_signup } from '../services/signup_service';

export const signup = async (formdata) => {
    
    //alert();
    return await post_signup("api/signup/", formdata);
    // fetch('http://localhost:8000/api/signup/', 
    // {
    //     method: 'POST',
    //     headers: 
    //     {
    //         'Access-Control-Allow-Origin' : '*',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formdata),
    // }).then(response => response.json())
    //     .then(data => {
    //         console.log('Success:', data);
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //         alert(error);
    //     });
};
