
import React from 'react';
import { Target, Calendar } from 'lucide-react';

const GoalCard = ({ title, progress, deadline, status }) => (
  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <Target className="h-6 w-6 text-pink-400 mr-3" />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm ${
        status === 'On Track' ? 'bg-green-900 text-green-200' :
        status === 'Behind' ? 'bg-red-900 text-red-200' :
        'bg-yellow-900 text-yellow-200'
      }`}>
        {status}
      </span>
    </div>
    <div className="space-y-3">
      <div>
        <div className="flex justify-between text-sm text-gray-300 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-pink-400 h-2 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="flex items-center text-sm text-gray-400">
        <Calendar className="h-4 w-4 mr-2" />
        <span>Deadline: {deadline}</span>
      </div>
    </div>
  </div>
);

const Goals = () => {
  const goals = [
    {
      title: "Lose 5kg",
      progress: 60,
      deadline: "March 30, 2024",
      status: "On Track"
    },
    {
      title: "Run 5km",
      progress: 45,
      deadline: "April 15, 2024",
      status: "Behind"
    },
    {
      title: "30 Day Yoga Challenge",
      progress: 80,
      deadline: "March 20, 2024",
      status: "On Track"
    }
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-[calc(100vh-4rem)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">My Goals</h1>
        <button className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg flex items-center">
          <Target className="h-5 w-5 mr-2" />
          Add New Goal
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal, index) => (
          <GoalCard key={index} {...goal} />
        ))}
      </div>
    </div>
  );
};

export default Goals;