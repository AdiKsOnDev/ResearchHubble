import React, { useState } from "react";
import { database } from "../firebase";
import { collection, query, getDocs, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import Fuse from "fuse.js";
import { ReactComponent as ManuscriptSVG } from "../Assets/manuscript.svg";
import { auth } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import Project from "./Project";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [savedProjects, setSavedProjects] = useState([]);

  const handleSearch = async () => {
    const projectsRef = collection(database, "Projects");
    const querySnapshot = await getDocs(projectsRef);
    const allProjects = querySnapshot.docs.map((doc) => doc.data());

    // Create a Fuse instance for the data
    const fuse = new Fuse(allProjects, {
      keys: [
        "Name",
        "Description",
        "Contributors",
        "SkillsNeeded",
        "Categories",
      ],
      includeMatches: true,
    });

    // Perform the fuzzy search
    const searchResults = fuse.search(searchQuery);

    // Extract the matched documents
    const results = searchResults.map((result) => result.item);

    setSearchResults(results);
  };

  const handleSave = async (result) => {
    const isSaved = savedProjects.some(
      (savedProject) => savedProject.Name === result.Name
    );

    // Get the current user
    const user = auth.currentUser;

    if (!user) {
      // Handle the case where the user is not authenticated
      console.log("User is not authenticated");
      return;
    }

    const userId = user.email;

    // Reference to the user's document in Firestore
    const userDocRef = doc(database, "Users", userId);

    // Fetch the user's document
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();

    if (!userData || !userData["saved-projects"]) {
      // If userData or "saved-projects" array doesn't exist, create it
      const newSavedProjects = [result.ref];

      // Update the user's document with the new "saved-projects" array
      await setDoc(
        userDocRef,
        { "saved-projects": newSavedProjects },
        { merge: true }
      );
    } else {
      // If "saved-projects" array exists, check if the project is already saved
      const isProjectSaved = userData["saved-projects"].some(
        (savedProject) => savedProject.projectName === result.Name
      );

      if (!isProjectSaved) {
        // If the project is not saved, add it to the "saved-projects" array
        const updatedSavedProjects = [
          ...userData["saved-projects"],
          { projectName: result.Name },
        ];

        // Update the user's document with the updated "saved-projects" array
        await setDoc(
          userDocRef,
          { "saved-projects": updatedSavedProjects },
          { merge: true }
        );
      }
    }

    if (isSaved) {
      // Remove the project from savedProjects
      setSavedProjects(
        savedProjects.filter(
          (savedProject) => savedProject.Name !== result.Name
        )
      );

      // Decrement the Saved property and update in searchResults
      const updatedSearchResults = searchResults.map((searchResult) => {
        if (searchResult.Name === result.Name) {
          return {
            ...searchResult,
            Saved: searchResult.Saved - 1,
            IsSaved: false,
          };
        }
        return searchResult;
      });
      setSearchResults(updatedSearchResults);

      // Decrement the Saved property in Firebase
      const projectRef = doc(database, "Projects", result.Name);
      await updateDoc(projectRef, { Saved: result.Saved - 1 });
    } else {
      // Increment the Saved property and add the project to savedProjects
      const updatedResult = {
        ...result,
        Saved: result.Saved + 1,
        IsSaved: true,
      };
      setSavedProjects([...savedProjects, updatedResult]);

      // Increment the Saved property in searchResults
      const updatedSearchResults = searchResults.map((searchResult) => {
        if (searchResult.Name === result.Name) {
          return updatedResult;
        }
        return searchResult;
      });
      setSearchResults(updatedSearchResults);

      // Increment the Saved property in Firebase
      const projectRef = doc(database, "Projects", result.Name);
      await updateDoc(projectRef, { Saved: result.Saved + 1 });
    }
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
      <Link
        to="/Add-Project"
        className="text-bone mt-5 font-semibold text-lg hover:text-sky duration-300"
      >
        Can't Find your project? Add it yourself
      </Link>
      <div className="flex flex-col justify center items-center bg-metal w-fit mt-5">
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
