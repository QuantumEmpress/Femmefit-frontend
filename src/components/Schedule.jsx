import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  X,
  Sparkles,
  Heart
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from './AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';

const Schedule = () => {
  const { userEmail } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [scheduledWorkouts, setScheduledWorkouts] = useState([]);
  const [availableWorkouts, setAvailableWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedTime, setSelectedTime] = useState('08:00');
  const [notes, setNotes] = useState('');

  const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    if (userEmail) {
      const fetchScheduledWorkouts = async () => {
        try {
          const dateStr = currentDate.toISOString().split('T')[0];
          const response = await axios.get(
            `http://localhost:8080/api/schedules/user/${userEmail}/date/${dateStr}`
          );
          setScheduledWorkouts(response.data);
        } catch (error) {
          console.error("Error fetching scheduled workouts:", error);
        }
      };
      fetchScheduledWorkouts();
    }
  }, [userEmail, currentDate]);

  useEffect(() => {
    if (showAddModal) {
      const fetchAvailableWorkouts = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/workout/user/${userEmail}`
          );
          setAvailableWorkouts(response.data);
        } catch (error) {
          console.error("Error fetching workouts:", error);
        }
      };
      fetchAvailableWorkouts();
    }
  }, [showAddModal, userEmail]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const firstDayOfWeek = firstDay.getDay();
    
    for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
    for (let i = 1; i <= lastDay.getDate(); i++) days.push(i);
    
    return days;
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleDateClick = (day) => {
    if (day) {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    }
  };

  const handleScheduleWorkout = async () => {
    if (!selectedWorkout) return;

    try {
      const dateStr = currentDate.toISOString().split('T')[0];
      const timeStr = `${selectedTime}:00`;
      
      await axios.post('http://localhost:8080/api/schedules', {
        userId: userEmail,
        workoutId: selectedWorkout.id,
        date: dateStr,
        time: timeStr,
        notes: notes
      });

      const response = await axios.get(
        `http://localhost:8080/api/schedules/user/${userEmail}/date/${dateStr}`
      );
      setScheduledWorkouts(response.data);

      setSelectedWorkout(null);
      setSelectedTime('08:00');
      setNotes('');
      setShowAddModal(false);
    } catch (error) {
      console.error("Error scheduling workout:", error);
      alert("Failed to schedule workout. Please try again.");
    }
  };

  const handleDeleteWorkout = async (scheduleId) => {
    try {
      await axios.delete(`http://localhost:8080/api/schedules/${scheduleId}`);
      const dateStr = currentDate.toISOString().split('T')[0];
      const response = await axios.get(
        `http://localhost:8080/api/schedules/user/${userEmail}/date/${dateStr}`
      );
      setScheduledWorkouts(response.data);
    } catch (error) {
      console.error("Error deleting scheduled workout:", error);
      alert("Failed to delete scheduled workout. Please try again.");
    }
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 via-pink-900/10 to-gray-900 min-h-[calc(100vh-4rem)]">
      <div className="relative mb-8">
        <div className="absolute rounded-lg -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 blur opacity-20"></div>
        <div className="relative flex items-center justify-between p-4 border border-gray-800 bg-gray-900/80 backdrop-blur-sm rounded-xl">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            Workout Schedule
          </h1>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-6 py-2 text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:shadow-pink-500/25"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Plan Workout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <div className="p-6 border shadow-xl bg-gray-800/90 backdrop-blur-sm border-gray-700/50 lg:col-span-2 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-2 mr-3 rounded-lg bg-pink-500/10">
                <CalendarIcon className="w-6 h-6 text-pink-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={prevMonth}
                className="p-2 text-pink-400 transition-all duration-300 rounded-lg hover:bg-pink-500/10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextMonth}
                className="p-2 text-pink-400 transition-all duration-300 rounded-lg hover:bg-pink-500/10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {daysInWeek.map(day => (
              <div key={day} className="py-2 text-sm font-medium text-center text-pink-300/60">
                {day}
              </div>
            ))}
            {getDaysInMonth(currentDate).map((day, index) => (
              <button
                key={index}
                onClick={() => handleDateClick(day)}
                className={`
                  aspect-square flex items-center justify-center rounded-lg transition-all duration-300
                  ${day ? 'hover:bg-pink-500/20 cursor-pointer' : ''}
                  ${day === currentDate.getDate() 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/20' 
                    : 'text-gray-300'}
                `}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Scheduled Workouts */}
        <div className="p-6 border shadow-xl bg-gray-800/90 backdrop-blur-sm border-gray-700/50 rounded-xl">
          <div className="flex items-center mb-6">
            <div className="p-2 mr-3 rounded-lg bg-pink-500/10">
              <Clock className="w-6 h-6 text-pink-400" />
            </div>
            <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              {currentDate.toLocaleDateString('en-US', {
                weekday: 'long', month: 'long', day: 'numeric'
              })}
            </h2>
          </div>

          <div className="space-y-4">
            {scheduledWorkouts.map(workout => (
              <div 
                key={workout.id}
                className="relative p-4 transition-all duration-300 border bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-xl border-gray-700/50 group hover:border-pink-500/50"
              >
                <button
                  onClick={() => handleDeleteWorkout(workout.id)}
                  className="absolute p-1.5 bg-red-500/90 backdrop-blur-sm rounded-full opacity-0 -top-2 -right-2 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-white">{workout.workoutTitle}</h3>
                  <span className="px-3 py-1 text-sm text-pink-400 rounded-full bg-pink-500/10">
                    {formatTime(workout.time)}
                  </span>
                </div>
                {workout.notes && (
                  <p className="mb-2 text-sm text-gray-400">{workout.notes}</p>
                )}
                <div className="flex items-center text-sm text-gray-400">
                  <Heart className="w-4 h-4 mr-2 text-pink-400" />
                  <span>Scheduled Workout</span>
                </div>
              </div>
            ))}

            {scheduledWorkouts.length === 0 && (
              <div className="py-12 text-center text-gray-400">
                <Sparkles className="w-8 h-8 mx-auto mb-3 text-pink-400 opacity-50" />
                <p>No workouts scheduled for today</p>
                <p className="mt-1 text-sm text-pink-400/60">Time to plan your next session!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Workout Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-md p-6 border shadow-xl bg-gray-800/90 backdrop-blur-sm border-gray-700/50 rounded-xl"
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute p-1.5 text-gray-400 transition-all duration-300 rounded-full top-4 right-4 hover:bg-pink-500/10 hover:text-pink-400"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="mb-6 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Plan Your Workout
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-pink-300">
                    Choose Your Workout
                  </label>
                  <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-60">
                    {availableWorkouts.map(workout => (
                      <button
                        key={workout.id}
                        onClick={() => setSelectedWorkout(workout)}
                        className={`p-3 text-left rounded-lg border transition-all duration-300 ${
                          selectedWorkout?.id === workout.id
                            ? 'border-pink-500 bg-pink-500/10 shadow-lg shadow-pink-500/20'
                            : 'border-gray-700 hover:border-pink-500/50'
                        }`}
                      >
                        <h3 className="font-medium text-white">{workout.title}</h3>
                        <p className="text-sm text-pink-400">{workout.duration} min</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-pink-300">
                    Select Time
                  </label>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-2 text-white transition-all duration-300 border border-gray-600 rounded-lg bg-gray-700/50 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-pink-300">
                    Add Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2 text-white transition-all duration-300 border border-gray-600 rounded-lg bg-gray-700/50 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    rows={3}
                    placeholder="Any special notes for this workout..."
                  />
                </div>

                <button
                  onClick={handleScheduleWorkout}
                  disabled={!selectedWorkout}
                  className="w-full px-6 py-3 mt-4 font-medium text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Schedule Workout
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Schedule;