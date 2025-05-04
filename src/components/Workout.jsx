import React, { useState, useEffect, useRef } from "react";
import {
  Activity,
  Clock,
  Flame,
  BarChart,
  ArrowLeft,
  Play,
  Trash2,
  EyeIcon,
  Pause,
  ChevronRight,
  Check,
  X,
  Sparkles,
  Heart,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "./AuthProvider";
import SearchBar from "./SearchBar";

const WorkoutCard = ({
  workout,
  onClick,
  onDelete,
  isComplete,
  searchTerm,
}) => {
  const { title, duration, calories, workoutIntensity, imagePath } = workout;

  const highlightSearchMatch = (text) => {
    if (!searchTerm || searchTerm.trim() === "") return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span
          key={index}
          style={{
            backgroundColor: "#c77bbf8b",
            color: "white",
            padding: "0 3px",
            borderRadius: "3px",
            fontWeight: "bold",
          }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 transform border bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl hover:shadow-lg hover:shadow-pink-500/10 group ${
        isComplete ? "border-[1px] border-green-500" : "border-gray-700/50"
      }`}
    >
      <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 group-hover:opacity-100" />

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(e);
        }}
        className="absolute z-20 p-2.5 transition-all duration-300 rounded-full opacity-0 right-4 top-4 bg-red-500/80 backdrop-blur-sm hover:bg-red-600 group-hover:opacity-100"
      >
        <Trash2 className="w-4 h-4 text-white" />
      </button>

      <div
        className="h-48 transition-transform duration-500 bg-center bg-cover group-hover:scale-105"
        style={{ backgroundImage: `url(${imagePath})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
      </div>

      <div className="relative z-10 p-6">
        <h3 className="mb-4 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
          {highlightSearchMatch(title)}
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex items-center p-2 border rounded-lg bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <Clock className="w-5 h-5 mr-2 text-pink-400" />
            <span className="text-sm text-gray-200">{duration}</span>
          </div>
          <div className="flex items-center p-2 border rounded-lg bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <Flame className="w-5 h-5 mr-2 text-pink-400" />
            <span className="text-sm text-gray-200">{calories}</span>
          </div>
          <div className="flex items-center p-2 border rounded-lg bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <BarChart className="w-5 h-5 mr-2 text-pink-400" />
            <span className="text-sm text-gray-200">{workoutIntensity}</span>
          </div>
          <button
            onClick={onClick}
            className="flex items-center justify-center p-2 transition-all duration-300 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 group-hover:scale-105"
          >
            <EyeIcon className="w-5 h-5 mr-2 text-pink-400" />
            <span className="text-sm text-pink-100">View</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const WorkoutDetail = ({ workout, onBack, isComplete }) => {
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const [workoutProgressId, setWorkoutProgressId] = useState(null);
  const hasSkipped = useRef(false);
  const [hasIncompleteWorkout, setHasIncompleteWorkout] = useState(false);
  const [completedExercises, setCompletedExercises] = useState([]);

  const { userEmail } = useAuth();

  const currentExercise = workout?.exercises?.[currentExerciseIndex];
  const totalExercises = workout?.exercises?.length || 0;

  const checkIncompleteWorkout = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/progress/incomplete/${userEmail}/${workout.id}`
      );
      if (data) {
        console.log("Incomplete workout found:", data);
        setHasIncompleteWorkout(true);
        setWorkoutProgressId(data.id);

        const completed = data.exerciseProgresses
          .filter((ep) => ep.completed)
          .map((ep) => ep.exerciseId);
        setCompletedExercises(completed);

        const incompleteExerciseIndex = data.exerciseProgresses.findIndex(
          (ep) => !ep.completed
        );

        if (incompleteExerciseIndex !== -1) {
          const incompleteExercise =
            data.exerciseProgresses[incompleteExerciseIndex];
          setCurrentExerciseIndex(incompleteExerciseIndex);
          setCurrentSet(incompleteExercise.completedSets + 1);
        }
      }
    } catch (error) {
      console.error("Error checking incomplete workout:", error);
    }
  };

  useEffect(() => {
    checkIncompleteWorkout();
  }, [userEmail, workout.id]);

  const getCompletedWorkoutProgressId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/progress/completed/${userEmail}/${workout.id}`
      );
      return response.data.id;
    } catch (error) {
      console.error("Error fetching completed workout progress:", error);
      return null;
    }
  };

  const startOrContinueWorkout = async () => {
    if (hasIncompleteWorkout) {
      setIsWorkoutStarted(true);
    } else {
      await startWorkout();
    }
  };

  const clearProgress = async () => {
    try {
      const progressId =
        workoutProgressId || (await getCompletedWorkoutProgressId());

      if (progressId) {
        await axios.delete(`http://localhost:8080/api/progress/${progressId}`);
      }

      setIsWorkoutStarted(false);
      setCurrentExerciseIndex(0);
      setCurrentSet(1);
      setIsPaused(false);
      setTimeLeft(0);
      setIsResting(false);
      setWorkoutComplete(false);
      setCompletedExercises([]);
      setHasIncompleteWorkout(false);
      setWorkoutProgressId(null);
      onBack();
    } catch (error) {
      console.error("Error clearing workout progress:", error);
    }
  };

  const startWorkout = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/progress/start/${userEmail}/${workout.id}`
      );
      setWorkoutProgressId(data.id);
      setIsWorkoutStarted(true);
      setCurrentExerciseIndex(0);
      setCurrentSet(1);
      setIsPaused(false);
      setWorkoutComplete(false);
      setIsResting(false);
      setTimeLeft(0);
    } catch (error) {
      console.error("Error starting workout:", error);
    }
  };

  const updateExerciseProgress = async (setsCompleted) => {
    if (!workoutProgressId || !currentExercise) return;

    try {
      await axios.put(
        `http://localhost:8080/api/progress/exercise/${workoutProgressId}/${currentExercise.id}`,
        null,
        { params: { completedSets: setsCompleted - 1 } }
      );
    } catch (error) {
      console.error("Error updating exercise progress:", error);
    }
  };

  const completeWorkout = async () => {
    if (!workoutProgressId) return;

    try {
      await axios.put(
        `http://localhost:8080/api/progress/complete/${workoutProgressId}`
      );
      setWorkoutComplete(true);
    } catch (error) {
      console.error("Error completing workout:", error);
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const completeSet = () => {
    const newSetCount = currentSet + 1;
    updateExerciseProgress(newSetCount);

    if (newSetCount <= currentExercise.sets) {
      setIsResting(true);
      setTimeLeft(currentExercise.restInterval);
    } else if (currentExerciseIndex < totalExercises - 1) {
      setCompletedExercises((prev) => [...prev, currentExercise.id]);
      setIsResting(true);
      setTimeLeft(currentExercise.restInterval);
    } else {
      setCompletedExercises((prev) => [...prev, currentExercise.id]);
      completeWorkout();
      setWorkoutComplete(true);
    }
  };

  const skipRest = () => {
    if (hasSkipped.current) return;
    hasSkipped.current = true;

    setIsResting(false);
    setTimeLeft(0);

    if (currentSet < currentExercise?.sets) {
      setCurrentSet((prev) => prev + 1);
    } else if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setCurrentSet(1);
    } else {
      setWorkoutComplete(true);
    }
    setTimeout(() => {
      hasSkipped.current = false;
    }, 0);
  };

  const nextStep = () => {
    if (isResting) {
      skipRest();
    } else {
      if (currentSet < currentExercise.sets) {
        setCurrentSet((prev) => prev + 1);
      } else if (currentExerciseIndex < totalExercises - 1) {
        setCurrentExerciseIndex((prev) => prev + 1);
        setCurrentSet(1);
      } else {
        setWorkoutComplete(true);
      }
    }
  };

  useEffect(() => {
    let timer;
    if (isResting && timeLeft > 0 && !isPaused) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            skipRest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isResting, timeLeft, isPaused]);

  useEffect(() => {
    setCurrentSet(1);
  }, [currentExerciseIndex]);

  if (!currentExercise) return null;

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-gray-900 via-pink-900/10 to-gray-900">
      <div className="relative h-[40vh] w-full">
        <img
          src={workout.imagePath}
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
        <div className="p-6 border shadow-xl bg-gray-800/90 backdrop-blur-sm border-gray-700/50 rounded-xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                {workout.title}
              </h1>
              <p className="text-gray-400">{workout.subtitle}</p>
            </div>
            {!isWorkoutStarted ? (
              <button
                onClick={isComplete ? clearProgress : startOrContinueWorkout}
                className="flex items-center px-6 py-3 text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:shadow-pink-500/25"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {isComplete
                  ? "Clear Workout"
                  : hasIncompleteWorkout
                  ? "Continue Workout"
                  : "Start Workout"}
              </button>
            ) : (
              <div className="flex gap-2">
                {isResting && (
                  <button
                    onClick={togglePause}
                    className="flex items-center px-4 py-2 text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  >
                    {isPaused ? (
                      <Play className="w-5 h-5 mr-2" />
                    ) : (
                      <Pause className="w-5 h-5 mr-2" />
                    )}
                    {isPaused ? "Resume" : "Pause"}
                  </button>
                )}
                <button
                  onClick={nextStep}
                  className="flex items-center px-4 py-2 transition-all duration-300 rounded-lg bg-gray-700/50 backdrop-blur-sm hover:bg-gray-600"
                >
                  <ChevronRight className="w-5 h-5 mr-2" />
                  Skip
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex items-center p-4 border rounded-lg bg-gray-700/50 backdrop-blur-sm border-gray-700/50">
              <Clock className="w-6 h-6 mr-3 text-pink-400" />
              <div>
                <p className="text-sm text-gray-400">Duration</p>
                <p className="font-semibold">{workout.duration} min</p>
              </div>
            </div>
            <div className="flex items-center p-4 border rounded-lg bg-gray-700/50 backdrop-blur-sm border-gray-700/50">
              <Flame className="w-6 h-6 mr-3 text-pink-400" />
              <div>
                <p className="text-sm text-gray-400">Calories</p>
                <p className="font-semibold">{workout.calories} kcal</p>
              </div>
            </div>
            <div className="flex items-center p-4 border rounded-lg bg-gray-700/50 backdrop-blur-sm border-gray-700/50">
              <BarChart className="w-6 h-6 mr-3 text-pink-400" />
              <div>
                <p className="text-sm text-gray-400">Intensity</p>
                <p className="font-semibold">{workout.workoutIntensity}</p>
              </div>
            </div>
          </div>

          {isWorkoutStarted ? (
            <div className="mb-8">
              <div className="p-6 mb-4 border rounded-lg bg-gray-700/50 backdrop-blur-sm border-gray-700/50">
                {workoutComplete ? (
                  <div className="py-8">
                    <h2 className="mb-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                      Workout Complete!
                    </h2>
                    <Check className="w-16 h-16 mx-auto text-green-500" />
                    <button
                      onClick={() => setIsWorkoutStarted(false)}
                      className="px-6 py-3 mt-6 text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:shadow-green-500/25"
                    >
                      <Sparkles className="inline-block w-5 h-5 mr-2" />
                      Finish Workout
                    </button>
                  </div>
                ) : isResting ? (
                  <>
                    <h2 className="mb-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      Rest Time
                    </h2>
                    <div className="my-6 text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      {timeLeft}s
                    </div>
                    <p className="text-gray-400">
                      {(() => {
                        if (currentSet < currentExercise.sets) {
                          return `Next: ${currentExercise.name} (Set ${
                            currentSet + 1
                          })`;
                        } else if (currentExerciseIndex < totalExercises - 1) {
                          const nextExercise =
                            workout.exercises[currentExerciseIndex + 1];
                          return `Next: ${nextExercise.name}`;
                        }
                        return null;
                      })()}
                    </p>
                    <button
                      onClick={skipRest}
                      className="px-6 py-3 mt-6 text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:shadow-blue-500/25"
                    >
                      Skip Rest
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="mb-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                      {currentExercise.name}
                    </h2>
                    <p className="text-lg text-gray-300">
                      Set {currentSet} of {currentExercise.sets}
                    </p>
                    <p className="my-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                      {currentExercise.reps} reps
                    </p>
                    <div className="flex justify-center gap-2 mt-4">
                      {Array.from({ length: currentExercise.sets }).map(
                        (_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                              i < currentSet - 1
                                ? "bg-gradient-to-r from-pink-500 to-purple-500"
                                : "bg-gray-600"
                            }`}
                          />
                        )
                      )}
                    </div>
                    <button
                      onClick={completeSet}
                      className="px-6 py-3 mt-6 text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:shadow-pink-500/25"
                    >
                      <Heart className="inline-block w-5 h-5 mr-2" />
                      Complete Set
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Workout Plan
              </h2>
              <div className="space-y-4">
                {workout.exercises.map((exercise, index) => (
                  <div
                    key={exercise.id}
                    className={`p-4 border-[1px] rounded-lg transition-all duration-300 ${
                      completedExercises.includes(exercise.id) || isComplete
                        ? "bg-green-600/20 border-green-600/50"
                        : "bg-gray-700/20 border-gray-700/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div
                          className={`flex items-center justify-center w-8 h-8 mr-4 rounded-full ${
                            completedExercises.includes(exercise.id) ||
                            isComplete
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : "bg-gradient-to-r from-pink-500 to-purple-500"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <h3 className="text-lg font-medium">{exercise.name}</h3>
                      </div>
                      <div className="text-sm text-gray-300">
                        Total: {exercise.reps * exercise.sets} reps
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pl-12">
                      <div
                        className={`p-2 rounded transition-all duration-300 ${
                          completedExercises.includes(exercise.id) || isComplete
                            ? "bg-green-500/20"
                            : "bg-gray-600/50"
                        }`}
                      >
                        <p className="text-xs text-gray-300">Sets</p>
                        <p className="font-medium">{exercise.sets}</p>
                      </div>
                      <div
                        className={`p-2 rounded transition-all duration-300 ${
                          completedExercises.includes(exercise.id) || isComplete
                            ? "bg-green-500/20"
                            : "bg-gray-600/50"
                        }`}
                      >
                        <p className="text-xs text-gray-300">Reps</p>
                        <p className="font-medium">{exercise.reps}</p>
                      </div>
                      <div
                        className={`p-2 rounded transition-all duration-300 ${
                          completedExercises.includes(exercise.id) || isComplete
                            ? "bg-green-500/20"
                            : "bg-gray-600/50"
                        }`}
                      >
                        <p className="text-xs text-gray-300">Rest</p>
                        <p className="font-medium">{exercise.restInterval}s</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Workout = () => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef(null);
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userEmail, searchTerm, setSearchTerm } = useAuth();

  const [completedWorkouts, setCompletedWorkouts] = useState([]);

  useEffect(() => {
    return () => {
      setSearchTerm("");
    };
  }, []);

  const filteredWorkouts = userWorkouts.filter((workout) =>
    workout.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchCompletedWorkouts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/progress/history/${userEmail}`
        );
        const completed = response.data
          .filter((progress) => progress.completed)
          .map((progress) => progress.workoutId);
        setCompletedWorkouts(completed);
        console.log("Completed", completed);
      } catch (error) {
        console.error("Error fetching completed workouts:", error);
      }
    };

    if (userEmail) {
      fetchCompletedWorkouts();
      fetchUserWorkouts();
    }
  }, [userEmail]);

  const handleWorkoutSelect = (workout) => {
    setSelectedWorkouts((prev) => {
      if (prev.some((w) => w.id === workout.id)) {
        return prev.filter((w) => w.id !== workout.id);
      }
      return [...prev, workout];
    });
  };

  const fetchUserWorkouts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/workout/user/${userEmail}`
      );
      const data = await response.data;
      setUserWorkouts(data);
    } catch (error) {
      console.error("Error fetching user workouts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUnselectedWorkouts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/workout/unselected/${userEmail}`
      );
      const data = await response.data;
      setWorkouts(data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  const saveSelectedWorkouts = async () => {
    try {
      const workoutIds = selectedWorkouts.map((w) => w.id);
      await axios.post(
        `http://localhost:8080/api/workout/user/${userEmail}/workouts`,
        workoutIds
      );
      setIsDialogOpen(false);
      setSelectedWorkouts([]);
      fetchUserWorkouts();
      fetchUnselectedWorkouts();
    } catch (error) {
      console.error("Error saving workouts:", error);
    }
  };

  const removeWorkout = async (workout) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/workout/user/${userEmail}/remove-workout/${workout.id}`
      );

      const response = await axios.get(
        `http://localhost:8080/api/workout/user/${userEmail}`
      );
      setUserWorkouts(response.data);
      fetchUserWorkouts();
      fetchUnselectedWorkouts();
    } catch (error) {
      console.error("Error removing workout:", error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setIsDialogOpen(false);
      }
    }

    if (isDialogOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDialogOpen]);

  useEffect(() => {
    fetchUnselectedWorkouts();
  }, []);

  useEffect(() => {
    if (userEmail) {
      fetchUserWorkouts();
    }
  }, [userEmail]);

  if (selectedWorkout) {
    return (
      <WorkoutDetail
        workout={selectedWorkout}
        onBack={() => setSelectedWorkout(null)}
        isComplete={completedWorkouts.includes(selectedWorkout.id)}
      />
    );
  }

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 via-pink-900/10 to-gray-900 min-h-[calc(100vh-4rem)]">
      <div className="relative mb-8">
        <div className="absolute rounded-lg -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 blur opacity-20"></div>
        <div className="relative p-4 border border-gray-800 bg-gray-900/80 backdrop-blur-sm rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              My Workouts
            </h1>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="flex items-center px-6 py-3 text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:shadow-pink-500/25"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Add Workout
            </button>
          </div>
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div
            ref={dialogRef}
            className="w-full max-w-2xl p-6 border shadow-xl bg-gray-800/90 backdrop-blur-sm border-gray-700/50 rounded-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Add New Workouts
              </h2>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="p-2 text-gray-400 transition-colors rounded-full bg-gray-700/50 hover:bg-gray-600 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6 max-h-[60vh] space-y-4 overflow-y-auto">
              {workouts?.length > 0 &&
                workouts.map((workout) => (
                  <div
                    key={workout.id}
                    onClick={() => handleWorkoutSelect(workout)}
                    className={`group relative overflow-hidden rounded-xl transition-all ${
                      selectedWorkouts.some((w) => w.id === workout.id)
                        ? "ring-2 ring-pink-500"
                        : ""
                    }`}
                  >
                    <div className="relative flex items-center gap-4 p-4 transition-colors bg-gray-700/50 backdrop-blur-sm hover:bg-gray-700">
                      <div className="w-16 h-16 overflow-hidden rounded-lg">
                        <img
                          src={workout.imagePath}
                          alt={workout.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1 text-lg font-semibold text-white">
                          {workout.title}
                        </h3>
                        <div className="flex items-center gap-4">
                          <span className="px-3 py-1 text-sm text-pink-400 rounded-full bg-pink-500/20">
                            {workout.workoutIntensity}
                          </span>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            {workout.duration}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Flame className="w-4 h-4" />
                            {workout.calories} cal
                          </div>
                        </div>
                      </div>
                      <div
                        className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 transition-colors ${
                          selectedWorkouts.some((w) => w.id === workout.id)
                            ? "border-pink-500 bg-pink-500"
                            : "border-gray-500"
                        }`}
                      >
                        {selectedWorkouts.some((w) => w.id === workout.id) && (
                          <Check className="w-full h-full text-white" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-6 py-3 text-gray-400 transition-colors rounded-xl hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={saveSelectedWorkouts}
                className="px-6 py-3 text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl hover:from-pink-600 hover:to-purple-600 hover:shadow-pink-500/25 disabled:opacity-50"
                disabled={selectedWorkouts.length === 0}
              >
                {selectedWorkouts.length > 0
                  ? `Add ${selectedWorkouts.length} Workout${
                      selectedWorkouts.length > 1 ? "s" : ""
                    }`
                  : "Select Workouts"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-pink-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
      ) : filteredWorkouts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onClick={() => setSelectedWorkout(workout)}
              onDelete={() => removeWorkout(workout)}
              isComplete={completedWorkouts.includes(workout.id)}
              searchTerm={searchTerm}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="min-w-md p-8 border bg-gray-800/50 backdrop-blur-sm rounded-xl border-gray-700/50">
            <Activity className="w-12 h-12 mx-auto mb-4 text-pink-400" />
            <h3 className="mb-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              {searchTerm ? "No workouts found" : "No Workouts Added Yet"}
            </h3>
            <p className="mb-6 text-gray-400">
              {searchTerm
                ? "Try a different search term"
                : "Get started by adding some workouts to your collection"}
            </p>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="flex items-center justify-center px-6 py-3 mx-auto text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:shadow-pink-500/25"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {searchTerm ? "Browse all workouts" : "Add Your First Workout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workout;
