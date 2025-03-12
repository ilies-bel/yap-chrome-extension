import axios from "axios";
import {tokenService} from "~service/tokenService";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


apiClient.interceptors.request.use(async (config) => {
    const token = await tokenService.getToken();
    console.log(token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
