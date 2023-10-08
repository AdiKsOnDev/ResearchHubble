
import {database } from "../../firebase";
import {
    doc,
    getDoc,
    collection
  } from 'firebase/firestore';
async function fetchUserData(userEmail) {
    try {
      const docRef = doc(collection(database, 'Users'), userEmail);
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
  
  export default fetchUserData;