import React, { useState } from 'react';
import { database } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import Project from './Project';

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const projectsRef = collection(database, 'Projects');
    const querySnapshot = await getDocs(projectsRef);
    const allProjects = querySnapshot.docs.map((doc) => doc.data());
  
    // Create a Fuse instance for the data
    const fuse = new Fuse(allProjects, {
      keys: ['Name', 'Description', 'Contributors', 'SkillsNeeded', 'Categories'],
      includeMatches: true,
    });
  
    // Perform the fuzzy search
    const searchResults = fuse.search(searchQuery);
  
    // Extract the matched documents
    const results = searchResults.map((result) => result.item);
  
    setSearchResults(results);
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
      <div className='flex flex-col justify center items-center bg-metal w-fit mt-5'>
        {searchResults.length !== 0 ? searchResults.map((result, index) => (
          <div key={result.Name} className='flex flex-col justify-center items-center w-full'>
            <Project prLink={result.Link} prDescription={result.Description} prName={result.Name} prSaved={result.Saved}></Project>
          </div>
        )) : ``}
      </div>
    </div>
  );
};

export default SearchBox;