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
    if (!Array.isArray(projects)) {
        // Handle the case where projects is not an array, e.g., by returning an empty array.
        return [];
      }
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
  
      const results = await response.json();
  
      if (Array.isArray(results)) {
        // Return the array of similarity scores directly
        return results;
      } else {
        console.log("Failed to calculate semantic similarity");
        // Return an array of default scores or handle the error as needed
        return new Array(projects.length).fill(0);
      }
    } catch (error) {
      console.error("Error calculating semantic similarity:", error);
      throw error;
    }
  }
  
  

  async function recommendProjects(userEmail, useFuse) {
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
      keys: ['Description'], // You only need to search in the project descriptions
      includeMatches: true,
    });
  
    const similarityScores = await calculateSemanticSimilarity(userObj.summary, allProjects);
  
    const recommendations = allProjects.map((project, index) => {
      const fuseResults = useFuse ? fuse.search(searchQuery) : [];
      const similarityScore = similarityScores[index];
  
      return {
        project,
        fuseScore: fuseResults, // This will contain fuzzy match information
        similarityScore,
      };
    });
  
    // Filter out recommendations with no similarity score
    const filteredRecommendations = recommendations.filter(
      (result) => result.fuseScore.length > 0 || result.similarityScore > 0
    );
  
    const sortedRecommendations = filteredRecommendations.sort((a, b) => {
      if (!useFuse) {
        // Sort by similarity score in descending order
        return b.similarityScore - a.similarityScore;
      } else {
        // Sort by fuseScore length in descending order
        return b.fuseScore.length - a.fuseScore.length;
      }
    });
  
    return sortedRecommendations;
  }
  

  
// async function recommendProjects(userEmail, useFuse) {
//     const user = await fetchUserDetails(userEmail);
//     const userString = user.description;
//     const userObj = JSON.parse(userString);
//     const searchQuery = userObj.summary;
  
//     // Fetch project details from Firestore
//     const projectsRef = collection(database, 'Projects');
//     const querySnapshot = await getDocs(projectsRef);
//     const allProjects = querySnapshot.docs.map((doc) => doc.data());
  
//     // Create a Fuse instance for fuzzy searching
//     const fuse = new Fuse(allProjects, {
//         keys: ['Name', 'Description'],
//         includeMatches: true,
//       });
    
  
//     const similarityScores = await calculateSemanticSimilarity(userObj.summary, allProjects);
  
//     const recommendations = allProjects.map((project, index) => {
//       const fuseScore = useFuse ? fuse.search(searchQuery) : [];
      
//       // Update the recommendations with similarity scores
//       const similarityScore = similarityScores[index];
  
//       return {
//         project,
//         fuseScore,
//         similarityScore,
//       };
//     });
  
//     // Filter out recommendations with no similarity score
//     const filteredRecommendations = recommendations.filter((result) => result.fuseScore.length > 0 || result.similarityScore > 0);
  
//     // Sort recommendations based on whether to use Fuse or not
//     const sortedRecommendations = filteredRecommendations.sort((a, b) => {
//       if (!useFuse) {
        
//         return b.similarityScore - a.similarityScore;
//       } else {
        
//         return b.fuseScore.length - a.fuseScore.length;
//       }
//     });
  
//     return sortedRecommendations;
//   }
  
  
  export default recommendProjects;
  
  

