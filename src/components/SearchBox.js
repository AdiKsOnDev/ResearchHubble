import React, { useState } from 'react';

const SearchBox = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Search"
        className="w-full px-4 py-2 border rounded-l-md focus:outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
