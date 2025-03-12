import {tokenService} from "~service/tokenService";
import {apiClient} from "~service/api";

export const authService = {

    // Login user
    login: async (email: string, password: string) => {
        try {
            const response = await apiClient.post('/auth/login', {email, password});
            const {token, expiresIn} = response.data;

            await tokenService.setToken(token, expiresIn)
            return response.data;
        } catch (error) {
            throw error.response?.data || {message: 'Login failed'};
        }
    },

    logout: () => {
        tokenService.removeToken()
    },

    isAuthenticated: async () => {
        return await tokenService.isTokenValid()
    },
};