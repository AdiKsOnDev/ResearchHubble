// import { ReactComponent as ManuscriptSVG } from '../Assets/manuscript.svg';
// import { ReactComponent as ManuscriptFilledSVG } from '../Assets/manuscriptfill.svg';
// import React, { useEffect, useState } from "react";
// import { auth, database } from "../firebase";
// import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
// import fetchUserData from './scripts/fetchUserData';

// function Project({ prLink, prDescription, prName, prSaved }) {
//   const [searchResults, setSearchResults] = useState([]);
//   // const [savedProjects, setSavedProjects] = useState([]);
//   const [userObj, setUserObj] = useState({});
//   const [description, setDescription] = useState("");
//   const [isSaved, setIsSaved] = useState(false);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user && user.email) {
//         // If the user is authenticated, load user data.
//         const userData = await fetchUserData(user.email);
//         setUserObj(userData || {});
//         setDescription(userData?.description || '');
//       } else {
//         // If the user is not authenticated, set default values.
//         setDescription("");
//         setUserObj({});
//       }
//     });

//     // Cleanup the listener when the component unmounts.
//     return () => unsubscribe();
//   }, []);

//   const handleSave = async () => {
//    // console.log("Handling save for result:", result);
    
//     // Add debug logs to check variables
//     // console.log("result name is ", prName)
//     // console.log("userObj:", userObj);
//     // console.log("description:", description);
//     // console.log("isSaved:", isSaved);
//     // setIsSaved(savedProjects.some((savedProject) => savedProject.Name === prName));
  
//     const user = auth.currentUser;
//     const userId = user ? user.email : "";
  
//     const userDocRef = userId ? doc(collection(database, 'Users'), userId) : "";
//     setUserObj(await fetchUserData(userId));
  
//     if (!user) {
//       // Handle the case where the user is not authenticated
//       console.log("User is not authenticated");
//       return;
//     }
  
//     if (userObj === null) {
//       // If userObj is null, set it to an empty object
//       setUserObj({});
//     }
  
//     // Check if userObj has a valid 'saved_projects' property
//     if (!userObj.saved_projects) {
//       userObj.saved_projects = [];
//     }
  
//     // Check if 'description' is defined and parse it if it's a string
//     // if (description) {
//     //   try {
//     //     const parsedDescription = JSON.parse(description);
//     //     setUserObj(parsedDescription);
//     //   } catch (error) {
//     //     console.error("Error parsing description:", error);
//     //   }
//     // }

//   // const userId = user ? user.email : "";

//   // const userDocRef = userId? (await doc(collection(database, 'Users'), userId)) : "";



//   // Reference to the user's document in Firestore

//   if (!userObj || !userObj?.saved_projects) {
//     // If userObj or "saved_projects" array doesn't exist, create it
//     const newSavedProjects = [{"projectName": prName}];

//     // Update the user's document with the new "saved_projects" array
//  if( newSavedProjects){
//     await setDoc(
//       userDocRef,
//       { "saved_projects": newSavedProjects },
//       { merge: true }
//     );
//     setIsSaved(true);
//  }
//   } else {
//     // If "saved_projects" array exists, check if the project is already saved
//     const isProjectSaved = userObj?.saved_projects.some(
//       (savedProject) => savedProject.projectName === prName
//     );

//     if (!isProjectSaved) {
      
//       const updatedSavedProjects = [
//         ...userObj?.saved_projects,
//         { projectName: prName },
//       ];

//       // Update the user's document with the updated "saved_projects" array
//       await updateDoc(
//         userDocRef,
//         { 
//           "saved_projects": updatedSavedProjects },
       
//       );
//       setIsSaved(true);
//     }else{

//       const updatedSavedProjects = userObj?.saved_projects.filter(
//             (savedProject) => savedProject.Name !== prName
//           )
//       await updateDoc(
//         userDocRef,
//         { 
//           "saved_projects": updatedSavedProjects },
       
//       );
//       setIsSaved(false);
//       console.log(isSaved);
//     }
//   }

//   if (isSaved) {
    
//     // setSavedProjects(
//     //   savedProjects.filter(
//     //     (savedProject) => savedProject.Name !== prName
//     //   )
//     // );

//     const updatedSearchResults = searchResults.map((searchResult) => {
//       if (searchResult.Name === prName) {
//         return {
//           ...searchResult,
//           Saved: searchResult.Saved + 1,
//           IsSaved: true,
//         };
//       }
//       return searchResult;
//     });
//     setSearchResults(updatedSearchResults);

//     // Decrement the Saved property in Firebase
//     const projectRef = doc(database, "Projects", prName);
//     await updateDoc(projectRef, { Saved: prSaved + 1 });
    
//     await updateDoc(userDocRef, {'saved_projects': userObj?.saved_projects.filter(
//       (savedProject) => savedProject.Name !== prName
//     ) })
//   } else {

//     const updatedResult = {
//       //...result,
//       Saved: prSaved - 1,
//       IsSaved: false,
//     };
//     // setSavedProjects([...savedProjects, updatedResult]);

//     // Increment the Saved property in searchResults
//     const updatedSearchResults = searchResults.map((searchResult) => {
//       if (searchResult.Name === prName) {
//         return updatedResult;
//       }
//       return searchResult;
//     });
//    await setSearchResults(updatedSearchResults);

//     // Increment the Saved property in Firebase
//     const projectRef =await doc(database, "Projects", prName);
//     await updateDoc(projectRef, { Saved:prSaved - 1 });
//   }

//   console.log("result name is ", prName)
//     console.log("userObj:", userObj);
//     console.log("description:", description);
//     console.log("isSaved:", isSaved);
// };
// //console.log("Rendering Project component with props:", { prLink, prDescription, prName, prSaved });

//   return ( 
//     <div className='flex flex-col justify-center items-center w-full'>
//       <div className="mt-4 text-bone flex flex-row justify-around items-center w-full bg-metal p-5">
//         <div className='flex flex-col w-1/4'>
//           <a className="text-2xl font-semibold w-fit flex mb-2 text-sky hover:underline" href={prLink}>{prName}</a>
//           <p className="description text-bone font-thin"> {/* Set the width here */}
//             {prDescription}
//           </p>

//           <div className='w-full'>
//             <div className='mt-2 flex flex-row'>
//               <span className='flex flex-row items-center justify-center'><ManuscriptSVG className='h-5 w-5 mr-2 mt-2' /> <p className='font-semibold mr-3'>{prSaved}</p></span>
//             </div>
//           </div>
//         </div>
//         <button
//           className={`flex flex-row justify-center items-center px-5 py-2 bg-grass font-semibold rounded-md hover:px-7 duration-300 `}
//           onClick={handleSave}
//         >
//           {isSaved ? (
//             <>
//               <ManuscriptFilledSVG className="h-5 w-5 mr-2" />
//               Unsave
//             </>
//           ) : (

//             <>

//               <ManuscriptSVG className="h-5 w-5 mr-2" />

//               Save

//             </>

//           )}

//         </button>
//       </div>
//   </div>
//   );
// }

// export default Project;

import { ReactComponent as ManuscriptSVG } from '../Assets/manuscript.svg';
import { ReactComponent as ManuscriptFilledSVG } from '../Assets/manuscriptfill.svg';
import React, { useEffect, useState } from "react";
import { auth, database } from "../firebase";
import { collection, doc, updateDoc } from "firebase/firestore";
import fetchUserData from './scripts/fetchUserData';

function Project({ prLink, prDescription, prName, prSaved }) {
  const [userObj, setUserObj] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && user.email) {
        // If the user is authenticated, load user data.
        const userData = await fetchUserData(user.email);
        setUserObj(userData || {});
      } else {
        // If the user is not authenticated, set default values.
        setUserObj({});
      }
    });

    // Cleanup the listener when the component unmounts.
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Check if the project is saved when the component mounts
    setIsSaved(userObj?.saved_projects?.some(savedProject => savedProject.projectName === prName));
  }, [userObj, prName]);

  const handleSave = async () => {
    const user = auth.currentUser;
    const userId = user ? user.email : "";

    if (!user) {
      // Handle the case where the user is not authenticated
      console.log("User is not authenticated");
      return;
    }

    const userDocRef = doc(collection(database, 'Users'), userId);
    await fetchUserData(userId);

    if (!userObj) {
      // If userObj is null, set it to an empty object
      setUserObj({});
    }

    const updatedSavedProjects = userObj.saved_projects || [];
    const isProjectSaved = updatedSavedProjects.some(savedProject => savedProject.projectName === prName);

    if (!isProjectSaved) {
      updatedSavedProjects.push({ projectName: prName });
    } else {
      // Remove the project if it's already saved
      const index = updatedSavedProjects.findIndex(savedProject => savedProject.projectName === prName);
      if (index !== -1) {
        updatedSavedProjects.splice(index, 1);
      }
    }

    // Update the user's document with the updated "saved_projects" array
    await updateDoc(userDocRef, { saved_projects: updatedSavedProjects });
    setIsSaved(!isSaved);
  };

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <div className="mt-4 text-bone flex flex-row justify-around items-center w-full bg-metal p-5">
        <div className='flex flex-col w-1/4'>
          <a className="text-2xl font-semibold w-fit flex mb-2 text-sky hover:underline" href={prLink}>{prName}</a>
          <p className="description text-bone font-thin">
            {prDescription}
          </p>

          <div className='w-full'>
            <div className='mt-2 flex flex-row'>
              <span className='flex flex-row items-center justify-center'>
                <ManuscriptSVG className='h-5 w-5 mr-2 mt-2' />
                <p className='font-semibold mr-3'>{prSaved}</p>
              </span>
            </div>
          </div>
        </div>
        <button
          className={`flex flex-row justify-center items-center px-5 py-2 bg-grass font-semibold rounded-md hover:px-7 duration-300 `}
          onClick={handleSave}
        >
          {isSaved ? (
            <>
              <ManuscriptFilledSVG className="h-5 w-5 mr-2" />
              Unsave
            </>
          ) : (
            <>
              <ManuscriptSVG className="h-5 w-5 mr-2" />
              Save
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Project;
