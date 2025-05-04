import { createContext, useState, useEffect, useContext } from 'react'
import React from 'react';
import axios from 'axios'
import { set } from 'react-hook-form';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}



export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize auth state from sessionStorage
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      // Set all state from stored data at once
      setUserEmail(storedUser.email);
      setIsLoggedIn(true);
      setUserData(storedUser.userData || null);
    }
    setLoading(false);
  }, []);
  
  // Fetch user data when email changes and we don't have userData
  useEffect(() => {
    const fetchUserData = async () => {
      if (userEmail && !userData) {
        try {
          const response = await axios.get(`http://localhost:8080/api/users/${userEmail}`);
          const newUserData = response.data;
          setUserData(newUserData);
          // Update sessionStorage with complete user data
          sessionStorage.setItem('user', JSON.stringify({
            userData: newUserData,
            email: userEmail,
            isLoggedIn: true
          }));
        } catch (error) {
          console.error("Error fetching user data:", error);
          logout();
        }
      }
    };

    fetchUserData();
  }, [userEmail, userData]);

  const login = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${email}`);
      const newUserData = response.data;
      
      setUserEmail(email);
      setIsLoggedIn(true);
      setUserData(newUserData);
      
      sessionStorage.setItem('user', JSON.stringify({
        email,
        isLoggedIn: true,
        userData: newUserData
      }));
    } catch (error) {
      console.error("Error logging in:", error);
      logout();
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    setUserData(null);
    setLoading(false);
    sessionStorage.removeItem('user');
  };

  const value = {
    userData,
    isLoggedIn,
    userEmail,
    searchTerm,
    setSearchTerm,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};