import React, { useState } from 'react';
import { Users, MessageSquare, Heart, Share2, Award, TrendingUp } from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('feed');

  const posts = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
        level: "Elite"
      },
      content: "Just completed a 5K personal best! 💪 Feeling stronger every day. #FitnessCommunity #PersonalBest",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1600",
      likes: 124,
      comments: 18,
      shares: 5,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      user: {
        name: "Emily Chen",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
        level: "Pro"
      },
      content: "Morning yoga session complete! Starting the day with positive energy and mindfulness. 🧘‍♀️ #YogaLife",
      likes: 89,
      comments: 12,
      shares: 3,
      timestamp: "4 hours ago"
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "Workout Warrior",
      description: "Complete 100 workouts",
      icon: <Award className="w-6 h-6 text-yellow-400" />,
      progress: 75,
      total: 100
    },
    {
      id: 2,
      title: "Early Bird",
      description: "Complete 50 morning workouts",
      icon: <TrendingUp className="w-6 h-6 text-pink-400" />,
      progress: 30,
      total: 50
    }
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Community</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveTab('feed')}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeTab === 'feed' 
                ? 'bg-pink-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Feed
          </button>
          <button 
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeTab === 'leaderboard' 
                ? 'bg-pink-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Award className="w-5 h-5 mr-2" />
            Leaderboard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Create Post */}
          <div className="p-6 bg-gray-800 border border-gray-700 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600">
                <Users className="w-6 h-6 text-white" />
              </div>
              <input
                type="text"
                placeholder="Share your fitness journey..."
                className="flex-1 px-4 py-2 text-gray-300 placeholder-gray-500 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          {/* Posts */}
          {posts.map(post => (
            <div key={post.id} className="bg-gray-800 border border-gray-700 rounded-xl">
              {/* Post Header */}
              <div className="flex items-center p-6 space-x-4">
                <img 
                  src={post.user.avatar} 
                  alt={post.user.name}
                  className="object-cover w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-white">{post.user.name}</h3>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-pink-400">{post.user.level}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{post.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-6 pb-4">
                <p className="mb-4 text-gray-300">{post.content}</p>
                {post.image && (
                  <img 
                    src={post.image} 
                    alt="Post" 
                    className="object-cover w-full rounded-lg max-h-96"
                  />
                )}
              </div>

              {/* Post Actions */}
              <div className="flex px-6 py-4 space-x-6 border-t border-gray-700">
                <button className="flex items-center space-x-2 text-gray-400 hover:text-pink-400">
                  <Heart className="w-5 h-5" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-pink-400">
                  <MessageSquare className="w-5 h-5" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-pink-400">
                  <Share2 className="w-5 h-5" />
                  <span>{post.shares}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <div className="p-6 bg-gray-800 border border-gray-700 rounded-xl">
            <div className="flex items-center mb-6">
              <Award className="w-6 h-6 mr-3 text-pink-400" />
              <h2 className="text-xl font-semibold text-white">Achievements</h2>
            </div>

            <div className="space-y-4">
              {achievements.map(achievement => (
                <div key={achievement.id} className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center mb-2">
                    {achievement.icon}
                    <div className="ml-3">
                      <h3 className="font-semibold text-white">{achievement.title}</h3>
                      <p className="text-sm text-gray-400">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between mb-1 text-sm text-gray-400">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.total}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-600 rounded-full">
                      <div 
                        className="h-2 bg-pink-400 rounded-full" 
                        style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;