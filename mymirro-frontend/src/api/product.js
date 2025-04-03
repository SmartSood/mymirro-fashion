import axios from 'axios';
//replace by port address of the backend server where you are hosting after cloning my repo
const API_URL = 'http://localhost:500/api/products';

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getRecommendations = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const response = await axios.get(`${API_URL}/recommendations`, {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  });
  return response.data;
};