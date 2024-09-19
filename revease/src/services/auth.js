import axios from "axios";  

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

export const login = async (username, password) => {
    try {
        const response = await api.post('api-token-auth/', {username, password});

        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const register = async (username, email, password) => {
    try {
      const response = await api.post('api/auth/register/', {
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
