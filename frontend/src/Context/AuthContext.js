import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    isAuthenticated: false
  });

  const signIn = async (email, password) => {
    // Mock authentication
    const user = {
      id: '1',
      email,
      name: 'John Doe'
    };
    setState({
      user,
      isAuthenticated: true
    });
  };

  const signUp = async (name, email, password) => {
    // Mock sign-up
    const user = {
      id: '1',
      email,
      name
    };
    setState({
      user,
      isAuthenticated: true
    });
  };

  const signOut = () => {
    setState({
      user: null,
      isAuthenticated: false
    });
  };

  return (
    <AuthContext.Provider value={{ state, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
