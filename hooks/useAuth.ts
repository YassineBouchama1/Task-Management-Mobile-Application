import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeData } from '~/utils/storage';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
   

      // here i am using dummy username and password
      //TODO : i will Replace With zod validation
      if (username === 'user' && password === 'password') {
          
      await storeData('authToken', 'dummy-token');

      setIsAuthenticated(true);
    } else {
      throw new Error('Invalid credentials');
    }
  };



  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, login, logout };
};

export default useAuth;
