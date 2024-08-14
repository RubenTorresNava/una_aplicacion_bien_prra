import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (usuario, contrasena) => {
    if (!usuario || !contrasena) {
      throw new Error('Usuario y contraseña son requeridos');
    }

    try {
      const response = await axios.post('http://192.168.1.5:3000/api/psicologos/login', { usuario, contrasena });
      const { token } = response.data;
      
      if (!token) {
        throw new Error('No se recibió un token válido');
      }

      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
    } catch (error) {
      throw new Error('Usuario o contraseña incorrectos');
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('userToken');
      setUserToken(null);
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkToken = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setUserToken(token);
      }
    } catch (error) {
      console.error("Token check error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
