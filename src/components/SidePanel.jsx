
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Activity, Target, Calendar, Users, Settings, Heart, Sparkles } from 'lucide-react';

const SidePanel = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Activity, label: 'Workouts', path: '/workouts' },

    { icon: Calendar, label: 'Schedule', path: '/schedule' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 border-r border-gray-700">
      <div className="p-6">
        <div className="relative group">
          <div className="absolute transition duration-1000 rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-pink-600 via-pink-400 to-pink-600 blur group-hover:opacity-50 group-hover:duration-200"></div>
          <div className="relative flex items-center px-4 py-3 leading-none bg-gray-800 rounded-lg ring-1 ring-gray-700">
            <div className="relative">
              <Heart className="absolute w-6 h-6 text-pink-500 animate-ping opacity-30" />
              <Heart className="relative w-6 h-6 text-pink-500" />
            </div>
            <div className="ml-3">
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 bg-clip-text">
                  Femme
                </span>
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text">
                  Fit
                </span>
              </div>
              <p className="mt-1 text-xs italic text-pink-400">
                Strength in Grace
              </p>
            </div>
          </div>
        </div>
      </div>
      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-pink-400 transition-colors duration-200 ${
              location.pathname === item.path ? 'bg-gray-700 text-pink-400' : ''
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SidePanel;