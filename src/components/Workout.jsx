import React, { useState } from 'react';
import { Activity, Clock, Flame, BarChart, ArrowLeft, Play } from 'lucide-react';

const WorkoutCard = ({ workout, onClick }) => {
  const { title, duration, calories, intensity, image } = workout;
  
  return (
    <div 
      className="overflow-hidden transition-all duration-300 transform bg-gray-800 border border-gray-700 cursor-pointer rounded-xl hover:scale-105"
      onClick={onClick}
    >
      <div 
        className="h-48 bg-center bg-cover" 
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="p-6">
        <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-pink-400" />
            <span className="text-sm text-gray-300">{duration}</span>
          </div>
          <div className="flex items-center">
            <Flame className="w-5 h-5 mr-2 text-pink-400" />
            <span className="text-sm text-gray-300">{calories}</span>
          </div>
          <div className="flex items-center">
            <BarChart className="w-5 h-5 mr-2 text-pink-400" />
            <span className="text-sm text-gray-300">{intensity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkoutDetail = ({ workout, onBack }) => {
  return (
    <div className="min-h-screen text-white bg-gray-900">
      <div className="relative h-[40vh] w-full">
        <img 
          src={workout.image} 
          alt={workout.title}
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-gray-900"></div>
        <button 
          onClick={onBack}
          className="absolute z-10 p-2 transition-colors rounded-full top-4 left-4 bg-gray-800/80 hover:bg-gray-700"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="relative p-6 -mt-8">
        <div className="p-6 bg-gray-800 shadow-xl rounded-xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="mb-2 text-3xl font-bold">{workout.title}</h1>
              <p className="text-gray-400">{workout.description}</p>
            </div>
            <button className="flex items-center px-6 py-3 bg-pink-600 rounded-lg hover:bg-pink-700">
              <Play className="w-5 h-5 mr-2" />
              Start Workout
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex items-center p-4 bg-gray-700 rounded-lg">
              <Clock className="w-6 h-6 mr-3 text-pink-400" />
              <div>
                <p className="text-sm text-gray-400">Duration</p>
                <p className="font-semibold">{workout.duration}</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-700 rounded-lg">
              <Flame className="w-6 h-6 mr-3 text-pink-400" />
              <div>
                <p className="text-sm text-gray-400">Calories</p>
                <p className="font-semibold">{workout.calories}</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-700 rounded-lg">
              <BarChart className="w-6 h-6 mr-3 text-pink-400" />
              <div>
                <p className="text-sm text-gray-400">Intensity</p>
                <p className="font-semibold">{workout.intensity}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold">Workout Plan</h2>
            <div className="space-y-3">
              {workout.exercises.map((exercise, index) => (
                <div 
                  key={index}
                  className="flex items-center p-4 bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center justify-center w-8 h-8 mr-4 bg-pink-600 rounded-full">
                    {index + 1}
                  </div>
                  <span>{exercise}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Workout = () => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const workouts = [
    {
      id: 1,
      title: "Morning Yoga Flow",
      duration: "30 min",
      calories: "150 cal",
      intensity: "Low",
      image: "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?auto=format&fit=crop&q=80&w=1600",
      description: "Start your day with a gentle yoga flow to increase flexibility and mindfulness.",
      exercises: [
        "Sun Salutation A - 5 rounds",
        "Warrior I & II Sequence",
        "Balance Poses",
        "Core Work",
        "Final Relaxation"
      ]
    },
    {
      id: 2,
      title: "HIIT Cardio",
      duration: "45 min",
      calories: "400 cal",
      intensity: "High",
      image: "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&q=80&w=1600",
      description: "High-intensity interval training to boost your metabolism and burn calories.",
      exercises: [
        "Jumping Jacks - 1 min",
        "Burpees - 45 sec",
        "Mountain Climbers - 1 min",
        "High Knees - 45 sec",
        "Rest - 30 sec"
      ]
    },
    {
      id: 3,
      title: "Strength Training",
      duration: "60 min",
      calories: "300 cal",
      intensity: "Medium",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=1600",
      description: "Build muscle and increase strength with this comprehensive workout.",
      exercises: [
        "Squats - 3x12",
        "Deadlifts - 3x10",
        "Bench Press - 3x12",
        "Rows - 3x12",
        "Core Work - 10 min"
      ]
    }
  ];

  if (selectedWorkout) {
    return <WorkoutDetail workout={selectedWorkout} onBack={() => setSelectedWorkout(null)} />;
  }

  return (
    <div className="p-6 bg-gray-900 min-h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Workouts</h1>
        <button className="flex items-center px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700">
          <Activity className="w-5 h-5 mr-2" />
          New Workout
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <WorkoutCard 
            key={workout.id} 
            workout={workout} 
            onClick={() => setSelectedWorkout(workout)}
          />
        ))}
      </div>
    </div>
  );
};

export default Workout;