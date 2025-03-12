"use client"
import {type ReactNode, useEffect, useState} from "react";
import {AuthContext, type User} from "~service/auth/AuthContext";
import {authService} from "~service/auth/authService";

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    // const router = useRouter();

    useEffect(() => {
        const initAuth = async () => {
            if (await authService.isAuthenticated()) {
                setUser({isLoggedIn: true});
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (username: string, password: string) => {
        const data = await authService.login(username, password);
        setUser({isLoggedIn: true});
        return data;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const isAuthenticated = () => {
        return authService.isAuthenticated()
    }

    return (
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

