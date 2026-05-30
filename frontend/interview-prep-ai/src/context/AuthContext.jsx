import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPath';

export const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New state to track loading status

  useEffect(() => {
    if(user) return; // If user is already set, skip fetching

    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      setLoading(false); // No token, so we can stop loading
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error('User not authenticated', error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token); // Assuming userData contains the token
    setLoading(false); // Stop loading after updating user
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

    return (
    <UserContext.Provider
        value={{
        user,
        loading,
        updateUser,
        clearUser,
        }}
    >
        {children}
    </UserContext.Provider>
    );
};

export default UserProvider;