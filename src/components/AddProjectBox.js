import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProjectBox = () => {
  const [formData, setFormData] = useState({
    name: '',
    contributors: '',
    url: '',
    error: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      error: '', // Clear any previous errors when the user starts typing
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, contributors, url } = formData;

    // Basic validation - check if name and contributors are not empty
    if (!name || !contributors || !url) {
      setFormData({ ...formData, error: 'Please enter valid Information' });
      return;
    }
  };

  const { name, contributors, url, error } = formData;

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
            placeholder='Name'
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

          {error && <p className="text-blood italic mb-5 text-xs">{error}</p>}
          
          <button className="text-bone bg-grass font-semibold text-lg px-8 py-2 w-30 rounded-md mb-5" type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectBox;
