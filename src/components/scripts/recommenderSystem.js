import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import Fuse from 'fuse.js';
import { database } from '../../firebase';
import fetch from "node-fetch";
import returnKey from './apiKey';

async function fetchUserDetails(userEmail) {
  try {
    const docRef = doc(collection(database, 'Users'), userEmail);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      console.log("No such document!");
      return {'summary':"I am an avid Figma Designer, and Open scientist interested in NASA"}; 
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
}


async function calculateSemanticSimilarity(userSummary, projects) {
    try {
      const sentences = projects.map((project) => `${project.Name}. ${project.Description}`);
      
      const response = await fetch(
        "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2",
        {
          headers: { Authorization: `Bearer ${returnKey("HF")}` },
          method: "POST",
          body: JSON.stringify({
            inputs: {
              source_sentence: userSummary,
              sentences: sentences,
            },
          }),
        }
      );
  
      const result = await response.json();
  
      if (result && result[0] && result[0].score) {
        return result[0].score; // Semantic similarity score
      } else {
        console.log("Failed to calculate semantic similarity");
        return 0; // Return a default score or handle the error as needed
      }
    } catch (error) {
      console.error("Error calculating semantic similarity:", error);
      throw error;
    }
  }

  async function recommendProjects(userEmail) {
    const user = await fetchUserDetails(userEmail);
    const userString = user.description;
    const userObj = JSON.parse(userString);
    const searchQuery = userObj.summary;
  
    // Fetch project details from Firestore
    const projectsRef = collection(database, 'Projects');
    const querySnapshot = await getDocs(projectsRef);
    const allProjects = querySnapshot.docs.map((doc) => doc.data());
  
    // Create a Fuse instance for fuzzy searching
    const fuse = new Fuse(allProjects, {
      keys: ['Name', 'Description'],
      includeMatches: true,
    });
  
    const similarityScores = await calculateSemanticSimilarity(userObj.summary, allProjects);
  
    const recommendations = allProjects.map((project, index) => {
      const fuseScore = fuse.search(searchQuery, project);
      const similarityScore = similarityScores[index];
  
      return {
        project,
        fuseScore,
        similarityScore,
      };
    });
  
    const filteredRecommendations = recommendations.filter((result) => result.fuseScore.length > 0);
    const sortedRecommendations = filteredRecommendations.sort((a, b) => b.similarityScore - a.similarityScore);
  
    return sortedRecommendations;
  }
  
export default recommendProjects;
