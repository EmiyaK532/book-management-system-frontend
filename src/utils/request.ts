import { message } from 'antd';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000,
});

axiosInstance.interceptors.request.use();

axiosInstance.interceptors.response.use(
  (response) => {
    if (
      response.status === 201 ||
      response.status === 200
    ) {
      //   message.success(response.data.message);
      return response;
    }
    message.error(response.data.message);
    return Promise.reject(response.data);
  },
  (error) => {
    message.error(error.response.data.message);
    return Promise.reject(error);
  },
);

export default axiosInstance;
