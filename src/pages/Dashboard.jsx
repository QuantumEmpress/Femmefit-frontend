import React from 'react';
import { Activity, Target, TrendingUp, Users } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, trend }) => (
  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-semibold mt-2 text-white">{value}</p>
      </div>
      <div className="w-12 h-12 rounded-full bg-pink-900/30 flex items-center justify-center">
        <Icon className="h-6 w-6 text-pink-400" />
      </div>
    </div>
    <div className="mt-4 flex items-center">
      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
      <span className="text-sm text-green-500">{trend}</span>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-900 h-[calc(100vh-4rem)]">
      <h1 className="text-2xl font-semibold text-white mb-6">Welcome back,</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          icon={Activity} 
          title="Active Minutes" 
          value="45 mins" 
          trend="+12% from last week"
        />
        <StatCard 
          icon={Target} 
          title="Goals Completed" 
          value="8/10" 
          trend="+3 this week"
        />
        <StatCard 
          icon={Users} 
          title="Community Rank" 
          value="#42" 
          trend="Top 10%"
        />
        <StatCard 
          icon={Activity} 
          title="Calories Burned" 
          value="2,450" 
          trend="+15% from last week"
        />
      </div>
    </div>
  );
};

export default Dashboard;