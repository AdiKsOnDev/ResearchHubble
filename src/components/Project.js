import { ReactComponent as ManuscriptSVG } from "../Assets/manuscript.svg";
import { ReactComponent as ManuscriptFilledSVG } from "../Assets/manuscriptfill.svg";
import React, { useEffect, useState } from "react";
import { auth, database } from "../firebase";
import { collection, doc, updateDoc } from "firebase/firestore";
import fetchUserData from "./scripts/fetchUserData";

function Project({ prLink, prDescription, prName, prSaved }) {
  const [userObj, setUserObj] = useState({});
  const [probJect, setProbject] = useState(
    doc(collection(database, "Projects"), prName)
  );
  const [isSaved, setIsSaved] = useState(false);
  const [savedCount, setSavedCount] = useState(prSaved); // Added savedCount state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && user.email) {
        const userData = await fetchUserData(user.email);
        setUserObj(userData || {});
      } else {
        setUserObj({});
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsSaved(
      userObj?.saved_projects?.some(
        (savedProject) => savedProject.projectName === prName
      )
    );
  }, [userObj, prName]);

  const handleSave = async () => {
    const user = auth.currentUser;
    const userId = user ? user.email : "";

    if (!user) {
      console.log("User is not authenticated");
      return;
    }

    const userDocRef = doc(collection(database, "Users"), userId);
    await fetchUserData(userId);

    if (!userObj) {
      setUserObj({});
    }

    const updatedSavedProjects = userObj.saved_projects || [];
    const isProjectSaved = updatedSavedProjects.some(
      (savedProject) => savedProject.projectName === prName
    );

    if (!isProjectSaved) {
      updatedSavedProjects.push({ projectName: prName });
      setSavedCount(savedCount + 1); // Increment savedCount
      setProbject(await doc(collection(database, "Projects"), prName));
      updateDoc(probJect, { Saved: savedCount });
    } else {
      const index = updatedSavedProjects.findIndex(
        (savedProject) => savedProject.projectName === prName
      );
      if (index !== -1) {
        updatedSavedProjects.splice(index, 1);
        setSavedCount(savedCount - 1); // Decrement savedCount
        setProbject(await doc(collection(database, "Projects"), prName));
        updateDoc(probJect, { Saved: savedCount });
      }
    }

    await updateDoc(userDocRef, { saved_projects: updatedSavedProjects });
    setIsSaved(!isSaved);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="mt-4 text-bone flex flex-row justify-around items-center w-full bg-metal p-5">
        <div className="flex flex-col w-1/4">
          <a
            className="text-2xl font-semibold w-fit flex mb-2 text-sky hover:underline"
            href={prLink}
          >
            {prName}
          </a>
          <p className="description text-bone font-thin">{prDescription}</p>

          <div className="w-full">
            <div className="mt-2 flex flex-row">
              <span className="flex flex-row items-center justify-center">
                <ManuscriptSVG className="h-5 w-5 mr-2 mt-2" />
                <p className="font-semibold mr-3">{savedCount}</p>{" "}
                {/* Display savedCount */}
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
