import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3232'
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('userToken');
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;