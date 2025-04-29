import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";
import SidePanel from "./components/SidePanel";
import Header from "./components/header";
import Dashboard from "./pages/Dashboard";
// import Goals from "./components/goals";
import Workout from "./components/Workout";
import Settings from "./components/settings";
// import Community from "./components/Community";
import Schedule from "./components/Schedule";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider, useAuth } from "./components/AuthProvider";

// ProtectedLayout component
const ProtectedLayout = () => {
  const { isLoggedIn } = useAuth();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <SidePanel />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Protected routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workouts" element={<Workout />} />
            <Route path="/settings" element={<Settings />} />
            {/* <Route path="/community" element={<Community />} /> */}
            <Route path="/Schedule" element={<Schedule />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;