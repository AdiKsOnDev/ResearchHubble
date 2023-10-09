import { collection, getDocs } from 'firebase/firestore';
import { database } from '../../firebase';

async function getTopProjects() {
  // Fetch project details from Firestore
  const projectsRef = collection(database, 'Projects');
  const querySnapshot = await getDocs(projectsRef);
  const allProjects = querySnapshot.docs.map((doc) => doc.data());

  const sortedProjects = allProjects.sort((a, b) => b.Saved - a.Saved);

  return sortedProjects.slice(0, 2);
}

export default getTopProjects;