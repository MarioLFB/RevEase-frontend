import axios from "axios";  

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

export const login = async (username, password) => {
    try {
        const reponse = await api.post('auth/login/', {username, password});

        localStorage.setItem('token', reponse.data.token);
        return Response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const register = async (username, email, password) => {
    try {
      const response = await api.post('auth/register/', {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error registering user', error);
      throw error;
    }
  };
  
  export const logout = () => {
    localStorage.removeItem('token');
  };