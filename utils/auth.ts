export const setToken = (token: string) => {
    localStorage.setItem('token', token);
    // Вызываем кастомное событие для обновления UI
    window.dispatchEvent(new CustomEvent('customStorageChange', {
        detail: { key: 'token', value: token }
    }));
};

export const removeToken = () => {
    localStorage.removeItem('token');
    // Вызываем кастомное событие для обновления UI
    window.dispatchEvent(new CustomEvent('customStorageChange', {
        detail: { key: 'token', value: null }
    }));
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
}; 