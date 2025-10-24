import React, { createContext, useState, useContext } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const data = Cookies.get('authenticatedUser');

  let userData = null;
  try {
    userData = data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Invalid user data in cookie:', error);
    Cookies.remove('authenticatedUser');
  }

  const [user, setUser] = useState(userData);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
