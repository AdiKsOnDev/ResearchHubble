import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { database } from "../firebase";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProjectPage() {
  const { projectName } = useParams();
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      const projectRef = doc(database, "Projects", projectName);
      const projectSnapshot = await getDoc(projectRef);
      if (projectSnapshot.exists()) {
        setProjectData(projectSnapshot.data());
        console.log("Fetched project data:", projectSnapshot.data());
      } else {
        console.log("Project not found");
        // Handle project not found
      }
    };

    fetchProjectData();
  }, [projectName]);

  if (!projectData) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const { Name, Description, Useful_Urls, "Skills Needed": SkillsNeeded, Link, Contributors, Categories } = projectData;

  return (
    <div className="scrollbar scrollbar-juicy-peach flex flex-col bg-metal p-10 items-center rounded-lg" style={{ width: '50%', maxWidth: 800, height: '71%', maxHeight: '1000px', overflowY: 'auto' }}>
    <header className="px-6 pt-4 pb-2">
      <h1 className="font-semibold text-3xl text-center mb-7 text-grass">{Name}</h1>
    </header>
    <main className="p-6">
        <section className="mb-4">
          <p className="text-white">{Description}</p>
        </section>
        <section className="mb-4">
          <h2 className="text-grass text-lg font-semibold mb-2">Contributors</h2>
          <ul>
            {Contributors && Contributors.split(',').map((contributor, index) => (
              <li key={index}>
                <a href={Useful_Urls} className="text-white">{contributor}</a>
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-4">
          <h2 className="text-grass text-lg font-semibold mb-2">Categories</h2>
          <ul>
            {Categories && Categories.map((category, index) => (
              <li key={index} className="text-white">{category}</li>
            ))}
          </ul>
        </section>
        <section className="mb-4">
          <h2 className="text-grass text-lg font-semibold mb-2">Skills Needed</h2>
          <ul>
            {SkillsNeeded && SkillsNeeded.split(',').map((skill, index) => (
              <li key={index} className="text-white">{skill.trim()}</li>
            ))}
          </ul>
        </section>
        {Link && (
        <a href={Link} className="text-bone bg-grass font-semibold text-lg px-7 py-2 w-30 rounded-md hover:px-9 duration-300">Link</a>
        )}

        <a to="/Chat" className="ml-5 text-bone bg-grass font-semibold text-lg px-7 py-2 w-30 rounded-md hover:px-9 duration-300">Chat</a>
    </main>
  </div>
  );
}

export default ProjectPage;
