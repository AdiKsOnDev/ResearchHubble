import React, { useState } from 'react';
import { database } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import { ReactComponent as ManuscriptSVG } from '../Assets/manuscript.svg';

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
        {searchResults != [] ? searchResults.map((result, index) => (
          <div className='flex flex-col justify-center items-center w-full'>
            <div key={index} className="mt-4 text-bone flex flex-row justify-around items-center w-full bg-metal p-5">
              <div className='flex flex-col w-1/4'>
                <a className="text-2xl font-semibold w-fit flex mb-2 text-sky hover:underline" href={result.Link}>{result.Name}</a>
                <p className="description text-bone font-thin"> {/* Set the width here */}
                  {result.Description}
                </p>
                <div className='w-full'>
                  <p className='mt-2 flex flex-row'>
                    <icon className='flex flex-row items-center justify-center'><ManuscriptSVG className='h-5 w-5 mr-2 mt-2' /> <p className='font-semibold mr-3'>{result.Saved}</p></icon>
                  </p>
                </div>
              </div>
              <button className='flex flex-row justify-center items-center px-5 py-2 bg-grass font-semibold rounded-md hover:px-7 duration-300'><ManuscriptSVG className='h-5 w-5 mr-2'/>Save</button>
            </div>
          </div>
        )) : ``}
      </div>
    </div>
  );
};

export default SearchBox;