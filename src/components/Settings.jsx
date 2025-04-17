
import React, { useContext, useState } from 'react';
import { User, Bell, Lock, Palette, HelpCircle, LogOut, X, Camera, Shield, Moon, Sun } from 'lucide-react';
import { AuthContext } from './AuthProvider';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const ProfileSection = () => (
    <div className="space-y-8">
      <div className="flex items-center space-x-6">
        <div className="relative group">
          <div className="flex items-center justify-center w-32 h-32 p-1 rounded-full bg-gradient-to-br from-pink-400 to-purple-600">
            <div className="flex items-center justify-center w-full h-full bg-gray-800 rounded-full">
              <User className="w-16 h-16 text-white" />
            </div>
          </div>
          <button className="absolute bottom-0 right-0 p-2 transition-colors transform bg-pink-600 rounded-full shadow-lg hover:bg-pink-700 group-hover:scale-110">
            <Camera className="w-5 h-5 text-white" />
          </button>
        </div>
        <div>
          <h2 className="mb-1 text-2xl font-bold text-white">name</h2>
          <p className="text-gray-400">Premium Member</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 text-white transition-all duration-200 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 text-white transition-all duration-200 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="your@email.com"
            />
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">
              Height
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-3 text-white transition-all duration-200 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Height"
              />
              <span className="absolute text-gray-400 -translate-y-1/2 right-4 top-1/2">cm</span>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">
              Weight
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-3 text-white transition-all duration-200 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Weight"
              />
              <span className="absolute text-gray-400 -translate-y-1/2 right-4 top-1/2">kg</span>
            </div>
          </div>
        </div>
      </div>

      <button className="px-8 py-3 text-white transition-all duration-200 rounded-lg shadow-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:shadow-pink-500/25">
        Save Changes
      </button>
    </div>
  );

  

  const sections = [
    {
      id: 'profile',
      title: 'Profile',
      icon: <User className="w-5 h-5" />,
      component: <ProfileSection />
    },

    {
      id: 'security',
      title: 'Security',
      icon: <Lock className="w-5 h-5" />,
      component: <div>Security Settings</div>
    },
  
    {
      id: 'help',
      title: 'Help & Support',
      icon: <HelpCircle className="w-5 h-5" />,
      component: <div>Help & Support</div>
    }
  ];

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
  }

  return (
    <div className="p-6 bg-gray-900 min-h-[calc(100vh-4rem)]">
      <h1 className="mb-8 text-3xl font-bold text-white">Settings</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="p-4 bg-gray-800 border border-gray-700 shadow-lg rounded-xl">
          <nav className="space-y-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {section.icon}
                <span>{section.title}</span>
              </button>
            ))}

            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center w-full px-4 py-3 space-x-3 text-red-400 transition-all duration-200 rounded-lg hover:bg-red-500/10"
            >
              <LogOut className="w-5 h-5" />
              <span>Log Out</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="p-8 bg-gray-800 border border-gray-700 shadow-lg lg:col-span-3 rounded-xl">
          {sections.find(section => section.id === activeSection)?.component}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md p-8 transition-all duration-200 transform scale-100 bg-gray-800 shadow-2xl rounded-2xl">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute p-2 text-gray-400 transition-colors rounded-full hover:text-white hover:bg-gray-700 right-4 top-4"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-500/10">
                <LogOut className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">Confirm Logout</h3>
              <p className="text-gray-400">Are you sure you want to log out of your account?</p>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-6 py-3 text-gray-300 transition-all duration-200 bg-gray-700 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 text-white transition-all duration-200 rounded-lg shadow-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-red-500/25"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;