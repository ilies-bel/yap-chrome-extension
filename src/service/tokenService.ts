import { Storage } from "@plasmohq/storage"

// Create a storage instance
const storage = new Storage()

// Constants for storage keys
const ACCESS_TOKEN = "access_token"
const ACCESS_TOKEN_EXPIRATION = "access_token_expiration"

export const tokenService = {
    async setToken(token: string, expiresIn: number) {
        const expirationTime = Date.now() + expiresIn
        await storage.set(ACCESS_TOKEN, token)
        await storage.set(ACCESS_TOKEN_EXPIRATION, expirationTime.toString())
    },

    async isTokenValid() {
        const token = await storage.get(ACCESS_TOKEN)
        const expiration = await storage.get(ACCESS_TOKEN_EXPIRATION)

        if (!token || !expiration) return false

        return parseInt(expiration) > Date.now()
    },

    async removeToken() {
        await storage.remove(ACCESS_TOKEN)
        await storage.remove(ACCESS_TOKEN_EXPIRATION)
    },

    async getToken() {
        return await storage.get(ACCESS_TOKEN)
    },
}