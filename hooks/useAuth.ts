import { useState, useCallback } from 'react';
import { setToken, removeToken } from '@/utils/auth';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);

    const fetchWithAuth = useCallback(async (url: string, options: RequestInit = {}) => {
        const token = localStorage.getItem('token');

        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        };

        return fetch(url, { ...options, headers });
    }, []);

    return {
        isLoading,
        setIsLoading,
        fetchWithAuth,
    };
}; 