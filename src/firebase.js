// Imports
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfdAOnhVN3_cAbPXYEFe2ptqI_3wf9r_c",
  authDomain: "researchhub-4f4c2.firebaseapp.com",
  projectId: "researchhub-4f4c2",
  storageBucket: "researchhub-4f4c2.appspot.com",
  messagingSenderId: "804163828782",
  appId: "1:804163828782:web:a1d33054310558aa35b3bf"
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig);
const database = getFirestore(fireApp);

const auth = getAuth(fireApp);
const provider = new GoogleAuthProvider();

export {
  fireApp,
  database,
  auth,
  provider
};