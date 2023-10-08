import { auth } from "../firebase";
import {useState, useEffect} from 'react'
import fetchUserData from "./scripts/fetchUserData";


function HomeBox() {

  const [displayName, setDisplayName] = useState("Guest");
  const [description, setDescription] = useState("");
  const [userObj, setUserObj] = useState(null);

 
  useEffect(() => {
    // Set up a Firebase authentication state listener to detect changes in authentication status.
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && user.email) {
        // If the user is authenticated, load user data.
        const userData = await fetchUserData(user.email);
        setDisplayName(userData?.display_name || '');
        setDescription(userData?.description || '');

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
      }
    });

    // Cleanup the listener when the component unmounts.
    return () => unsubscribe();
  }, []);
  return ( 
    <div className="flex flex-row h-screen justify-center items-center">
      {/* User Card */}
      <div className="bg-metal h-1/4 min-h-fit min-w-fit w-1/3 rounded-md flex flex-col justify-center items-center">
        <h1 className="text-bone text-3xl font-semibold">{displayName}</h1>
        <h2 className="text-bone text-sm">User's ID</h2>

        <a href="/" className="w-3/4 text-center border-t-2 border-bone mt-8 text-sky p-5 text-xl font-semibold hover:underline">Saved Projects</a>
      </div>
      
      {/* Recommendations */}
   
      {/* Trending projects */}
      <div>

      </div>
    </div>
  );
}

export default HomeBox;