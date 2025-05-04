import React from "react";
import { Bell, User } from "lucide-react";
import SearchBar from "./SearchBar";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <div className="flex items-center justify-between h-20 px-8 border-b border-gray-700 bg-gray-800/80 backdrop-blur-sm">
      {location.pathname === "/workouts" && (
        <div className="w-[520px]">
          <SearchBar />
        </div>
      )}
    </div>
  );
};

export default Header;
