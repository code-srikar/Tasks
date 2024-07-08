import React, { useEffect, createContext, useState, useContext } from 'react';

// Create a context for authentication
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState(null);

    // Load token from localStorage if available
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            // Optionally, you can decode the token to fetch user details or validate the token.
        }
    }, []);

    // Function to handle login
    const loginAction = async (data) => {
        try {
            const response = await fetch('https://tasks-bc5v.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(errorDetails.message || 'Login failed');
            }

            const responseData = await response.json();
            if (responseData.token) {
                setToken(responseData.token);
                setUser(responseData.user);
                localStorage.setItem('token', responseData.token);
                return responseData.user;
            } else {
                throw new Error('Token missing in response');
            }
        } catch (err) {
            console.error('Login error:', err.message);
            alert(err.message);
        }
    };

    // Function to handle signup
    const signupAction = async (data) => {
        try {
            const response = await fetch('https://tasks-bc5v.onrender.com/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(errorDetails.message || 'Signup failed');
            }

            const responseData = await response.json();
            if (responseData.token) {
                setToken(responseData.token);
                setUser(responseData.user);
                localStorage.setItem('token', responseData.token);
                return responseData.user;
            } else {
                throw new Error('Token missing in response');
            }
        } catch (err) {
            console.error('Signup error:', err.message);
            alert(err.message);
        }
    };

    // Function to handle logout
    const logout = () => {
        setToken('');
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ token, user, loginAction, signupAction, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
