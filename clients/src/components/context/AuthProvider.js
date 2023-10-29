import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state
  const [lastActivity, setLastActivity] = useState(localStorage.getItem('lastActivity') || Date.now());

  const login = (userData) => {
    // Logic for handling login
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setLastActivity(Date.now());
    localStorage.setItem('lastActivity', Date.now());

  }

  const logout = () => {
    // Logic for handling logout
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('lastActivity');


  }
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const checkActivityInterval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;
      if (timeSinceLastActivity > 600000) { // 10 minutes in milliseconds
        logout();
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(checkActivityInterval);
  }, [lastActivity]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
