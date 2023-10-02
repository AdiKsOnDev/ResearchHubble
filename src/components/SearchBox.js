import React, { useState } from 'react';
import { database } from '../firebase';
import { collection } from 'firebase/firestore';

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const projectsRef = collection(database, 'projects');

    // Perform a Firestore query to search for projects
    const querySnapshot = query(query(citiesRef, where("Name", ">=", searchQuery)), where("Name", "<=", searchQuery));

    const results = querySnapshot.docs.map((doc) => doc.data());
    setSearchResults(results);
  };
  // className="w-full h-full px-4 py-2 border rounded-l-md focus:outline-none text-xl font-semibold"
  // className="px-4 py-2 h-full text-bone bg-grass font-semibold rounded-r-md focus:outline-none text-xl"

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          className="w-full h-14 px-4 py-2 border rounded-l-md focus:outline-none text-xl font-semibold"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="px-4 py-2 h-14 text-bone bg-grass font-semibold rounded-r-md focus:outline-none text-xl"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div>
        {searchResults.map((result, index) => (
          <div key={index} className="mt-4">
            <h2 className="text-lg font-semibold">{result.title}</h2>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBox;
