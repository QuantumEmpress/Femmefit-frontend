import React, { useContext, useState } from 'react';
import { User, LogOut, X, Heart } from 'lucide-react';
import { AuthContext } from './AuthProvider';

const Settings = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
  }

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900 min-h-[calc(100vh-4rem)]">
      <div className="max-w-2xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
          Settings
        </h1>

        <div className="space-y-6">
          {/* Profile Card */}
          <div className="p-8 border bg-gray-800/90 border-gray-700/50 rounded-2xl">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-pink-400/80 to-purple-600/80">
                  <div className="flex items-center justify-center w-[124px] h-[124px] bg-gray-800 rounded-full">
                    <User className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h2 className="mb-1 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  Sarah Johnson
                </h2>
                <p className="text-gray-400">sarah.johnson@example.com</p>
              </div>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center w-full gap-2 px-4 py-3 text-red-400 transition-all duration-300 rounded-lg hover:bg-red-500/10 hover:text-red-300"
              >
                <LogOut className="w-5 h-5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* About App */}
          <div className="p-8 border bg-gray-800/90 border-gray-700/50 rounded-2xl">
            <div className="flex flex-col items-center text-center">
              <Heart className="w-12 h-12 mb-4 text-pink-400" />
              <h2 className="mb-2 text-xl font-bold text-white">About FitFlow</h2>
              <p className="text-gray-400">
                Your personal fitness companion, designed to help you achieve your wellness goals.
                Version 1.0.0
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md p-8 border bg-gray-800/90 border-gray-700/50 rounded-2xl">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute p-2 text-gray-400 transition-all duration-300 rounded-full hover:text-white hover:bg-gray-700 right-2 top-2"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20">
                <LogOut className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">Confirm Logout</h3>
              <p className="text-gray-400">Are you sure you want to log out?</p>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-6 py-3 text-gray-300 transition-all duration-300 rounded-xl bg-gray-700/50 hover:bg-gray-700 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
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