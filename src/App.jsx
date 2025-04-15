import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import SidePanel from './components/SidePanel';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Goals from './components/Goals';
import Workout from './components/Workout';
import Settings from'./components/settings';
import  Community from'./components/Community';
import Schedule from'./components/Schedule'
import Login from './pages/Login';
import Signup from './pages/Signup';

export const AuthContext = React.createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/api/users/me', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setIsAuthenticated(true);
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('authToken');
    } finally {
      setLoading(false);
    }
  };

  const authValue = React.useMemo(() => ({
    isAuthenticated,
    user,
    login: (token, userData) => {
      localStorage.setItem('authToken', token);
      setIsAuthenticated(true);
      setUser(userData);
    },
    logout: () => {
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      setUser(null);
    }
  }), [isAuthenticated, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-12 h-12 border-t-2 border-b-2 border-pink-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authValue}>
      <Router>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-12 h-12 border-t-2 border-b-2 border-pink-500 rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />} />
            <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" replace />} />
            <Route path="/*" element={
              isAuthenticated ? <ProtectedLayout /> : <Navigate to="/login" replace />
            } />
          </Routes>
        </Suspense>
      </Router>
    </AuthContext.Provider>
  );
}

function ProtectedLayout() {
  return (
    <div className="flex h-screen bg-gray-900">
      <SidePanel />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 p-4 overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workouts" element={<Workout />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/community" element={<Community/>} />
            <Route path="/Schedule" element={<Schedule/>} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;