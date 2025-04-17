import React, { useContext, useState } from 'react';
import { User, Bell, Lock, Palette, HelpCircle, LogOut } from 'lucide-react';
import { AuthContext } from './AuthProvider';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const ProfileSection = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-pink-600">
          <User className="w-12 h-12 text-white" />
        </div>
        <button className="px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700">
          Change Photo
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-400">
            Full Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-400">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-400">
            Height
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="cm"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-400">
            Weight
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="kg"
          />
        </div>
      </div>

      <button className="px-6 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700">
        Save Changes
      </button>
    </div>
  );

  const NotificationsSection = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <div>
            <h3 className="font-medium text-white">Workout Reminders</h3>
            <p className="text-sm text-gray-400">Get notified about scheduled workouts</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <div>
            <h3 className="font-medium text-white">Goal Updates</h3>
            <p className="text-sm text-gray-400">Receive updates on your fitness goals</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <div>
            <h3 className="font-medium text-white">Community Activity</h3>
            <p className="text-sm text-gray-400">Get notified about likes and comments</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
          </label>
        </div>
      </div>
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
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell className="w-5 h-5" />,
      component: <NotificationsSection />
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Lock className="w-5 h-5" />,
      component: <div>Security Settings</div>
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: <Palette className="w-5 h-5" />,
      component: <div>Appearance Settings</div>
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
    console.log('User logged out');
  }

  return (
    <div className="p-6 bg-gray-900 min-h-[calc(100vh-4rem)]">
      <h1 className="mb-6 text-2xl font-semibold text-white">Settings</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="p-4 bg-gray-800 border border-gray-700 rounded-xl">
          <nav className="space-y-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-pink-600 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {section.icon}
                <span>{section.title}</span>
              </button>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 space-x-3 text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
            >
              <LogOut className="w-5 h-5" />
              <span>Log Out</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="p-6 bg-gray-800 border border-gray-700 lg:col-span-3 rounded-xl">
          {sections.find(section => section.id === activeSection)?.component}
        </div>
      </div>
    </div>
  );
};

export default Settings;