import React, { useState, useEffect } from 'react';
import { database, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';

async function fetchUserData(userId) {
  try {
    const docRef = doc(collection(database, 'Users'), userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

function UserProfile({ user }) {
  const [displayName, setDisplayName] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState({});
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    async function loadUserData() {
      const userData = await fetchUserData(await auth.currentUser.email);
      setDisplayName(userData?.display_name || '');
      setDescription(userData?.description || '');

      // Check if description is not empty before attempting to parse it
      if (description) {
        try {
          setUserObj(JSON.parse(description));
        } catch (error) {
          console.error("Error parsing description:", error);
        }
      }
    }
    loadUserData();
  }, [user, description]);
  const navigate = useNavigate()
  async function handleResetClick() {
    try {
      // Get the current user's email
      const userEmail = auth.currentUser.email;
  
      // Reference to the user's document in the "Users" collection
      const userDocRef = doc(collection(database, 'Users'), userEmail);
  
      // Delete the user's document
      await deleteDoc(userDocRef);
  
      // Update the state to reflect the reset data
      setDisplayName('');
      setDescription('');
      setSkills({});
      setUserObj(null);
  
      window.location.reload()
      console.log("PROFILE DELETED");
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  }
  

  return (
    <div className="p-24 scrollbar scrollbar-juicy-peach flex flex-col bg-metal p-10 items-center rounded-lg" style={{ width: '50%', maxWidth: 800, height: description ? '71%' : '55%', maxHeight: '1000px', overflowY: 'auto' }}>
      <header className="px-6 pt-4 pb-2">
        <h1 className="font-semibold text-3xl text-center mb-7 text-bone">{displayName|| "User"}'s Profile</h1>
      </header>
      <main className="p-6">
        <section className="mb-4">
          <h2 className="text-grass text-lg font-semibold mb-2">Profile Summary</h2>
          <p className="text-bone">{userObj?.summary || ""}</p>
        </section>
        <section className="mb-4">
          <h2 className="text-grass text-lg font-semibold mb-2">My Skills</h2>
          <ul>
            {userObj ? (Object.keys(userObj.skills).map((key) => (
              <li className="text-bone" key={key}>{key}: {userObj.skills[key]}</li>
            ))): ""}
          </ul>
        </section>
        <footer className="mt-4">
          <button onClick={handleResetClick} className="text-bone bg-grass font-semibold text-lg px-8 py-2 w-30 rounded-md">Reset My Profile</button>
        </footer>
      </main>
    </div>
  );
}

export default UserProfile;
