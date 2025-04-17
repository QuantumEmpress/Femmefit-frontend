import React, { useContext } from "react";
import { Activity, Target, TrendingUp, Users } from "lucide-react";
import { useAuth } from "../components/AuthProvider";

const StatCard = ({ icon: Icon, title, value, trend }) => (
  <div className="p-6 bg-gray-800 border border-gray-700 rounded-xl">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      </div>
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-900/30">
        <Icon className="w-6 h-6 text-pink-400" />
      </div>
    </div>
    <div className="flex items-center mt-4">
      <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
      <span className="text-sm text-green-500">{trend}</span>
    </div>
  </div>
);

const Dashboard = () => {
  const { userData } = useAuth();
  return (
    <div className="p-6 bg-gray-900 h-[calc(100vh-4rem)]">
      <h1 className="mb-6 text-2xl font-semibold text-white">
        Welcome back {userData?.username || "User"}
      </h1>

      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
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
