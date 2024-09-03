import axios from 'axios';



export const post_signup = async (url, data) => {
    try 
    {   
        data.gender = data.gender[0].toUpperCase()
        const response = await axios.post(url, JSON.stringify(data));
        return response;
    } 
    catch (error) 
    {
        try
        {
            alert('An error occurred. Please try again:\n' + error.response.data.error_message);
            return error.response
        }
        catch(error2)
        {
            alert(error)
            return error 
        }
        
    }

    // try {
    //     const response = await fetch('https://localhost:8000/api/signup/', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin' : "*",
    //       },
    //       body: JSON.stringify(data),
    //     });
  
    //     if (response.ok) {
    //       const result = await response.json();
    //       // Handle success, e.g., show a success message or redirect to another page
    //       console.log('Sign up successful:', result);
    //     } else {
    //       // Handle errors, e.g., show an error message
    //       console.error('Sign up failed:', response.statusText);
    //     }
    //   } catch (error) {
    //     console.error('Error during sign up:', error);
    //   }

};

