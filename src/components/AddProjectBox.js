import React, { useState } from 'react';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { database } from '../firebase';

const AddProjectBox = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contributors: '',
    url: '',
    categories: [], // Store selected categories as an array
    skillsNeeded: '',
    error: '',
  });

  const categoriesOptions = ["AI", "Sciences", "Other","Other2","Other3","Other4","Other5"]; // Add your category options here

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      error: '', // Clear any previous errors when the user starts typing
    });
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = [...formData.categories];

    if (updatedCategories.includes(category)) {
      // If category is already selected, remove it
      const index = updatedCategories.indexOf(category);
      updatedCategories.splice(index, 1);
    } else {
      // If category is not selected, add it
      updatedCategories.push(category);
    }

    setFormData({
      ...formData,
      categories: updatedCategories,
      error: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, contributors, url, categories, skillsNeeded } = formData;

    const projectsRef = collection(database, 'Projects');

    // Perform a Firestore query to search for projects
    const querySnapshot = await getDocs(query(projectsRef, where("Name", ">=", name), where("Name", "<=", name)));
    const results = querySnapshot.docs.map((doc) => doc.data());

    // Basic validation - check if name, contributors, and url are not empty
    if (!name || !contributors || !url || categories.length === 0) {
      setFormData({ ...formData, error: 'Please enter valid information and select at least one category' });
      return;
    } else if (results.length > 0) {
      setFormData({ ...formData, name: '', error: 'There is already a project with this title' });
      return;
    }

    // Add a new document in the "Projects" collection
    await setDoc(
      doc(database, "Projects", name),
      {
        Name: name,
        Description: description,
        Contributors: contributors,
        Link: url,
        Categories: categories,
        SkillsNeeded: skillsNeeded,
      }
    );
  };

  const { name, description, contributors, url, skillsNeeded, error } = formData;

  return (
    <div className="flex flex-col bg-metal w-fit p-10 items-center rounded-lg">
      <h2 className="font-semibold text-center mb-7 text-3xl text-bone">Add Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center">
          <input
            type="text"
            className='mb-5 p-2 rounded-md bg-bone'
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
            placeholder='Title'
          />

          <textarea
            className='mb-5 p-20 rounded-md bg-bone'
            id="description"
            name="description"
            value={description}
            onChange={handleInputChange}
            placeholder='Description'
          />

          <input
            type="contributors"
            className='mb-5 p-2 rounded-md bg-bone'
            id="contributors"
            name="contributors"
            value={contributors}
            onChange={handleInputChange}
            placeholder='Contributors'
          />

          <input
            type="url"
            className='mb-5 p-2 rounded-md bg-bone'
            id="url"
            name="url"
            value={url}
            onChange={handleInputChange}
            placeholder='Link'
          />

        {/* Category checkboxes */}
<div className="mb-5 p-2 rounded-md bg-bone">
  <label>Select Categories:</label>
  <br></br>
  {categoriesOptions.map((category) => (
    <label key={category}>
      <input
        type="checkbox"
        value={category}
        checked={formData.categories.includes(category)}
        onChange={() => handleCategoryChange(category)}
      />
      {category}
    </label>
  ))}
</div>

          {/* End of Category checkboxes */}

          <input
            type="text"
            className='mb-5 p-2 rounded-md bg-bone'
            id="skillsNeeded"
            name="skillsNeeded"
            value={skillsNeeded}
            onChange={handleInputChange}
            placeholder='Skills Needed'
          />

          {error && <p className="text-blood italic mb-5 text-xs">{error}</p>}
          <button className="text-bone bg-grass font-semibold text-lg px-8 py-2 w-30 rounded-md mb-5" type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectBox;
