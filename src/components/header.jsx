
import React from 'react';
import { Bell, User } from 'lucide-react';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <div className="flex items-center justify-between h-20 px-8 border-b border-gray-700 bg-gray-800/80 backdrop-blur-sm">
      <div className="w-[520px]">
        <SearchBar />
      </div>
      
   
    </div>
  );
};

export default Header;