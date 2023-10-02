import React, { useState } from 'react';
import { database } from '../firebase';
import { collection, query, getDocs, where } from 'firebase/firestore';

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const projectsRef = collection(database, 'Projects');
  
    // Perform a Firestore query to search for projects
    const querySnapshot = await getDocs(query(projectsRef, where("Name", ">=", searchQuery), where("Name", "<=", searchQuery)));
  
    const results = querySnapshot.docs.map((doc) => doc.data());
    setSearchResults(results);
    console.log(results);
  };  

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
      <div className='flex flex-col justify-center items-center'>
        {searchResults.map((result, index) => (
          <div key={index} className="mt-4 text-bone flex flex-col justify-center items-center bg-metal p-5 w-fit rounded-md">
            <h2 className="text-lg font-semibold">{result.Name}</h2>
            <a className='hover:text-sky duration-300' href={result.Link}>{result.Link}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBox;
