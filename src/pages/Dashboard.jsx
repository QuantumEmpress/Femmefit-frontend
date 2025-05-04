import React, { useState, useEffect } from "react";
import { Activity, Flame, Target, Clock, TrendingUp } from "lucide-react";
import { useAuth } from "../components/AuthProvider";
import axios from "axios";

const StatCard = ({ icon: Icon, title, value, trend, loading }) => (
  <div className="relative p-8 overflow-hidden transition-all duration-300 bg-gray-800 border border-gray-700 rounded-2xl hover:scale-105 group">
    <div className="absolute top-0 right-0 w-40 h-40 transition-transform transform bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-3xl rotate-12 group-hover:rotate-45"></div>
    <div className="absolute bottom-0 left-0 w-32 h-32 transition-transform transform bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-2xl -rotate-12 group-hover:rotate-45"></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center transition-colors border w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-pink-500/20 group-hover:border-pink-500/40">
            <Icon className="text-pink-400 transition-colors w-7 h-7 group-hover:text-pink-300" />
          </div>
          <h3 className="text-xl font-medium text-gray-400 transition-colors group-hover:text-gray-300">
            {title}
          </h3>
        </div>
      </div>
      <div className="space-y-3">
        {loading ? (
          <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
        ) : (
          <p className="text-4xl font-bold tracking-tight text-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent">
            {value}
          </p>
        )}
        {!loading && (
          <div className="flex items-center text-sm font-medium text-green-400">
            <TrendingUp className="w-4 h-4 mr-1.5" />
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { userData, userEmail } = useAuth();
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    completedWorkouts: 0,
    totalCalories: 0,
    totalMinutes: 0,
    weeklyTrend: "+0%",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkoutStats = async () => {
      try {
        setLoading(true);

        // Get total workouts
        const workoutsResponse = await axios.get(
          `http://localhost:8080/api/workout/user/${userEmail}`
        );
        const totalWorkouts = workoutsResponse.data.length;

        // Get completed workouts count
        const completedCountResponse = await axios.get(
          `http://localhost:8080/api/progress/completed/count/${userEmail}`
        );
        const totalCompleted = completedCountResponse.data;

        // Get persistent stats
        const statsResponse = await axios.get(
          `http://localhost:8080/api/user-stats/${userEmail}`
        );

        const weeklyTrend =
          totalCompleted > 0 ? `+${Math.floor(totalCompleted * 10)}%` : "+0%";

        setStats({
          totalWorkouts,
          completedWorkouts: totalCompleted,
          totalCalories: statsResponse.data.totalCalories,
          totalMinutes: statsResponse.data.totalMinutes,
          weeklyTrend,
        });
      } catch (error) {
        console.error("Error fetching workout stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchWorkoutStats();
    }
  }, [userEmail]);

  return (
    <div className="p-6 bg-gray-900 min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 mb-16 md:flex-row md:items-center">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-white to-gray-400 bg-clip-text">
              Welcome back, {userData?.username || "User"} 👋
            </h1>
            <p className="text-xl text-gray-400">
              Your fitness journey at a glance
            </p>
          </div>
          <div className="flex items-center px-6 py-3 bg-gray-800 border border-gray-700 rounded-full shadow-lg shadow-black/20">
            <Clock className="w-6 h-6 mr-3 text-pink-400" />
            <span className="text-lg text-white">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            icon={Activity}
            title="Active Minutes"
            value={`${stats.totalMinutes} mins`}
            trend={stats.weeklyTrend}
            loading={loading}
          />
          <StatCard
            icon={Flame}
            title="Calories Burned"
            value={`${stats.totalCalories} kcal`}
            trend={stats.weeklyTrend}
            loading={loading}
          />
          <StatCard
            icon={Target}
            title="Workouts Completed"
            value={`${stats.completedWorkouts}`}
            trend={stats.weeklyTrend}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
