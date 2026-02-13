//src/context/AuthContext.jsx 

import React, { createContext, useState, useEffect } from 'react';
import { login, register, resetPassward } from '../services/authService';
import { getToken, setToken, removeToken } from '../utils/tokenUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (token) {
            // Optionally, you can decode the token to get user info
            setUser({ token });
        }
        setLoading(false);
    }, []);

    const handleLogin = async (credentials) => {
        try {
            const response = await login(credentials);
            setToken(response.token);
            setUser({ token: response.token });
        } catch (error) {
            throw error;
        }
    };
    
    const handleLogout = () => {
        removeToken();
        setUser(null);
    };

    const handleRegister = async (userInfo) => {
        try {
            await register(userInfo);
        } catch (error) {
            throw error;
        }
    };

    const handleResetPassword = async (email) => {
        try {
            await resetPassward(email);
        } catch (error) {
            throw error;
        }
    };
    
    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                loading, 
                handleLogin, 
                handleLogout, 
                handleRegister, 
                handleResetPassword 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
