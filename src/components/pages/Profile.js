import React, { useState, useEffect } from 'react';
import Header from '../Header';
import ProfileSettingsBox from '../ProfileSettingsBox';
import { database, auth } from '../../firebase';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import ProfilePage from '../UserProfile';
function Profile() {
  const [stateComplete, setStateComplete] = useState("loading");
  const [userDoc, setUserDoc] = useState(null);

  // Get the current user's email address and fetch their corresponding document from Firestore
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const docRef = doc(collection(database, 'Users'), auth.currentUser.email);
        getDoc(docRef).then((doc) => {
          if (doc.exists()) {
            setUserDoc(doc.data());
            setStateComplete("Done");
          } else {
            console.log("No such document!");
            setStateComplete("None");
          }
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col bg-midnight min-w-max justify-center items-center h-screen">
      <Header active="profile" />
      {stateComplete == "Done" ? (
       <ProfilePage/>
      ) : stateComplete == "None"?(
        <ProfileSettingsBox />
      ):<></>}
    </div>
  );
}

export default Profile;