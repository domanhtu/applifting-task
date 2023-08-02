import axios from 'axios';


// Create an Axios instance with custom headers
const createAxiosInstance = (user: User | null) => {

  const instance = axios.create({
    baseURL: 'https://fullstack.exercise.applifting.cz',
    headers: {
      'X-API-KEY': 'a91f604b-9e61-408a-a23b-71075b501ed5',
      Authorization: user ? user.token : '', // Include the user token if it exists, or an empty string otherwise
    },
  });

  return instance;
};

export default createAxiosInstance;