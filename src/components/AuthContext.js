import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
