import axios from 'axios';

const storeToken = (refresh, access) => {
  //console.log(refresh + " ____ " +  access);
  sessionStorage.setItem('refresh_token', refresh);
  sessionStorage.setItem('access_token', access);
}

export const post_login = async (url, email, password) => {
  try 
    {   
        const data = {
          'email' : email,
          'password' : password,
        }
        const response = await axios.post(url, JSON.stringify(data));
        //console.log(response);
        storeToken(response.data["refresh_token"], response.data["access_token"]);
        sessionStorage.setItem('user_id', response.data["user_id"]);
        //axios.defaults.headers.post["Authorization"] = response.data["access_token"];
        return response;
    } 
    catch (error) 
    {
        try
        {  
          alert('An error occurred. Please try again:\n' + error.response.data.message);
          return error.response
        }
        catch(error2)
        {
          alert(error);
          return error
        }
        
    }
};