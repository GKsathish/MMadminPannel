

import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Initialize `isLoggedIn` from `localStorage`
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const [username1, setUsername] = useState('Admin');

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const login = () => {
    setIsLoggedIn(true);
    setUsername(username1);

  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

 
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout,username1 }}>
      {children}
    </AuthContext.Provider>
  );
};

