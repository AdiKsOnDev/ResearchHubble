import React, { useState } from 'react';

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    
  };

  return (
    <div className="relative flex items-center w-1/2 h-14">
      <input
        type="text"
        placeholder="Search"
        className="w-full h-full px-4 py-2 border rounded-l-md focus:outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="px-4 py-2 h-full text-midnight bg-white font-semibold rounded-r-md hover:bg-grass duration-300 hover:text-white focus:outline-none"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
