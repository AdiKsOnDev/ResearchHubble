import { auth } from "../firebase";
import { useState, useEffect } from 'react'
import fetchUserData from "./scripts/fetchUserData";
import recommendProjects from "./scripts/recommenderSystem";
import Project from "./Project";
import getTopProjects from "./scripts/getTopProjects"

function HomeBox() {
  const [displayName, setDisplayName] = useState("Guest");
  const [description, setDescription] = useState("");
  const [userObj, setUserObj] = useState(null);
  let [loggedIn, setLoggedIn] = useState("");
  const [projects, setProjects] = useState([]); // Use state to store the projects.
  const [topProjects, setTopProjects] = useState([]); // Use state to store the projects.

  useEffect(() => {
    // Set up a Firebase authentication state listener to detect changes in authentication status.
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && user.email) {
        // If the user is authenticated, load user data.
        const userData = await fetchUserData(user.email);
        setDisplayName(userData?.display_name || '');
        setDescription(userData?.description || '');
        setLoggedIn(userData?"True":"");
        if (description) {
          try {
            setUserObj(JSON.parse(description));
          } catch (error) {
            console.error("Error parsing description:", error);
          }
        }
      } else {
        // If the user is not authenticated, set default values.
        setDisplayName("Guest");
        setDescription("");
        setUserObj(null);
        setLoggedIn("");
      }
    });

    // Cleanup the listener when the component unmounts.
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loggedIn === "True") {
      // Use async/await to wait for the promise to resolve.
      (async () => {
        const recommendedProjects = await recommendProjects(auth.currentUser.email, false);
        console.log("The recommended projects are ", recommendedProjects);
        if (Array.isArray(recommendedProjects)) {
          setProjects(recommendedProjects); // Update the state with the projects.
        }
      })();
    }
  }, [loggedIn]);

  useEffect(() => {
    // Use async/await to wait for the promise to resolve.
    (async () => {
      const result = await getTopProjects();
      console.log("The TOP projects are ", result);

      if (Array.isArray(result)) {
        setTopProjects(result); // Update the state with the projects.
      }
    })();
  }, [loggedIn]);

  return ( 
    <div className="flex flex-row h-screen justify-center mt-28">
      {/* User Card */}
      <div className="mt-12 bg-metal h-1/2 min-h-fit min-w-fit w-2/4 mx-12 rounded-md flex flex-col justify-center items-center">
        <img alt="name" src="https://eu.ui-avatars.com/api/?name=Guest&size=250" class="mb-10 h-36 w-36 rounded-full" />
        <h1 className="text-bone text-3xl font-semibold">{displayName}</h1>
        <h2 className="text-bone text-sm">User's ID</h2>

        <a href="/" className="w-3/4 text-center border-t-2 border-bone mt-8 text-sky p-5 text-xl font-semibold hover:underline">Saved Projects</a>
      </div>
      
      {/* Recommendations */}
      <div className='flex flex-col justify center items-center bg-metal w-fit rounded-md mt-12'>
      <h1 className="my-10 text-bone font-semibold text-3xl">Perfect picks, just for you</h1>
        {projects.length !== 0 ? projects.map((recommendation) => (
          <div key={recommendation.project.Name} className='flex flex-col justify-center items-center w-full'>
            <Project prLink={recommendation.project.Link} prDescription={recommendation.project.Description} prName={recommendation.project.Name} prSaved={recommendation.project.Saved}></Project>
          </div>
        )) : ''}
      </div>

      {/* Trending projects */}
      <div className='flex flex-col justify center items-center bg-metal w-fit h-fit rounded-md mt-12 mx-12'>
        <h1 className="my-10 text-bone font-semibold text-3xl">Top Projects</h1>
        {topProjects.length !== 0 ? topProjects.map((top) => (
          <div key={top.Name} className='flex flex-col justify-center items-center w-full'>
            <Project prLink={top.Link} prDescription={top.Description} prName={top.Name} prSaved={top.Saved}></Project>
          </div>
        )) : ''}
      </div>
    </div>
  );
}

export default HomeBox;