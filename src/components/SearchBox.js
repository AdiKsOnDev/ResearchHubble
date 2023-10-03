import React, { useState } from 'react';
import { database } from '../firebase';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';

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
    <div className="container mx-auto p-4 flex flex-col justify-center items-center">
      <div className="flex w-full">
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
      <Link to="/Add-Project" className='text-bone mt-5 font-semibold text-lg hover:text-sky duration-300'>Can't Find your project? Add it yourself</Link>
      <div className='flex flex-col justify-center items-center'>
        {searchResults != [] ? searchResults.map((result, index) => (
          <div key={index} className="mt-4 text-bone flex flex-col justify-center items-center bg-metal p-5 w-full rounded-md">
            <h2 className="text-2xl font-semibold">{result.Name}</h2>
            <p className='mt-2'><span className='font-semibold'>Contributors:</span> {result.Contributors}</p>
            <button className='px-5 py-2 bg-grass font-semibold mt-5 rounded-md hover:px-7 duration-300' href={result.Link}>Link</button>
          </div>
        )) : ``}
      </div>
    </div>
  );
};

export default SearchBox;
