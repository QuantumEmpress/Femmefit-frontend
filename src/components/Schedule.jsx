import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Activity, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);

  const scheduledWorkouts = [
    {
      id: 1,
      title: "Morning Yoga",
      time: "07:00 AM",
      duration: "30 min",
      type: "Yoga"
    },
    {
      id: 2,
      title: "HIIT Session",
      time: "05:30 PM",
      duration: "45 min",
      type: "Cardio"
    }
  ];

  const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const firstDayOfWeek = firstDay.getDay();
    
    // Add empty days for padding
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add actual days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(i);
    }
    
    return days;
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  return (
    <div className="p-6 bg-gray-900 min-h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Schedule</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Schedule Workout
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <div className="p-6 bg-gray-800 border border-gray-700 lg:col-span-2 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <CalendarIcon className="w-6 h-6 mr-3 text-pink-400" />
              <h2 className="text-xl font-semibold text-white">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={prevMonth}
                className="p-2 transition-colors rounded-lg hover:bg-gray-700"
              >
                <ChevronLeft className="w-5 h-5 text-gray-400" />
              </button>
              <button 
                onClick={nextMonth}
                className="p-2 transition-colors rounded-lg hover:bg-gray-700"
              >
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {daysInWeek.map(day => (
              <div key={day} className="py-2 text-sm font-medium text-center text-gray-400">
                {day}
              </div>
            ))}
            {getDaysInMonth(currentDate).map((day, index) => (
              <div 
                key={index}
                className={`
                  aspect-square flex items-center justify-center rounded-lg
                  ${day ? 'hover:bg-gray-700 cursor-pointer' : ''}
                  ${day === currentDate.getDate() ? 'bg-pink-600 text-white' : 'text-gray-300'}
                `}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Workouts */}
        <div className="p-6 bg-gray-800 border border-gray-700 rounded-xl">
          <div className="flex items-center mb-6">
            <Clock className="w-6 h-6 mr-3 text-pink-400" />
            <h2 className="text-xl font-semibold text-white">Today's Schedule</h2>
          </div>

          <div className="space-y-4">
            {scheduledWorkouts.map(workout => (
              <div 
                key={workout.id}
                className="p-4 transition-colors bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-white">{workout.title}</h3>
                  <span className="text-sm text-pink-400">{workout.time}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Activity className="w-4 h-4 mr-2" />
                  <span>{workout.type}</span>
                  <span className="mx-2">•</span>
                  <span>{workout.duration}</span>
                </div>
              </div>
            ))}

            {scheduledWorkouts.length === 0 && (
              <div className="py-8 text-center text-gray-400">
                No workouts scheduled for today
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;