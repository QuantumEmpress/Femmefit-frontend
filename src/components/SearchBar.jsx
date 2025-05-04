import React, { useState } from "react";
import { Search, X, Sparkles } from "lucide-react";
import { useAuth } from "./AuthProvider";

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useAuth();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <div
        className={`absolute inset-0 bg-gradient-to-r from-gray-700/40 via-gray-600/40 to-gray-700/40 rounded-2xl
        transition-opacity duration-500 ${
          isFocused ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundSize: "200% 100%",
          animation: isFocused ? "gradient 6s linear infinite" : "none",
        }}
      />

      <div className="relative flex items-center group">
        <div
          className={`absolute -inset-[2px] rounded-2xl transition-all duration-300
          bg-gradient-to-r from-gray-600/60 via-gray-600/60 to-gray-600/60
          ${isFocused ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}
        />

        <div className="relative w-full bg-gray-700/80 backdrop-blur-sm rounded-2xl">
          <div className="flex items-center">
            <div className="relative pl-5">
              <Search
                className={`h-6 w-6 transition-colors duration-300 
                ${isFocused ? "text-pink-400" : "text-gray-300"}`}
              />
              {isFocused && (
                <Sparkles className="absolute w-3 h-3 text-pink-300 -top-1 -right-1 animate-pulse" />
              )}
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full px-4 py-3.5 bg-transparent text-lg text-gray-100 placeholder-gray-300
                focus:outline-none transition-all duration-300"
              placeholder="Search workouts..."
            />

            {searchTerm && (
              <div className="pr-4">
                <button
                  onClick={() => setSearchTerm("")}
                  className="p-1.5 rounded-full hover:bg-gray-600 transition-colors duration-200
                    group/clear flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-gray-300 transition-colors duration-200 group-hover/clear:text-gray-100" />
                </button>
              </div>
            )}
          </div>

          <div
            className={`absolute bottom-0 inset-x-0 h-[2px] rounded-full
            bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400
            transition-transform duration-300 origin-left
            ${isFocused ? "scale-x-100" : "scale-x-0"}`}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
