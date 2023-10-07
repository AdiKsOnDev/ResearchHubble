import React, { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import CVProcess from './scripts/CVProcess';
import '../scrollbar.css';
import {
  doc,
  getDoc,
  setDoc,
  collection
} from 'firebase/firestore';
import { auth, database } from '../firebase';

const skillLevels = ['Novice', 'Intermediate', 'Advanced', 'Expert'];

const ProfileSettingsBox = () => {
  const [formData, setFormData] = useState({
    name: '',
    cv: null,
    cvText: '',
    description: '', // Store JSON in the description
    skills: {},
  });
  const [saveButton, setSaveButton] = useState('Save');
  const [updated, setUpdated] = useState('');
  const [summary, setSummary] = useState('');
  const [editedSummary, setEditedSummary] = useState('');
  const handleInputChange = async (e) => {
    const { name, value, files } = e.target;
  
    if (name === 'cv') {
      const cvFile = files[0];
  
      if (cvFile) {
        try {
          setSaveButton("Processing");
          const cvText = await extractTextFromPDF(cvFile);
  
          setFormData((prevData) => ({
            ...prevData,
            cv: cvFile,
            cvText: cvText,
          }));
  
          const newSummary = await CVProcess(cvText);
          const FullSummaryObj = JSON.parse(newSummary);
  
          setSummary(FullSummaryObj.summary);
          setEditedSummary(FullSummaryObj.summary);
  
          // Don't forget to update the skills as well
          setFormData((prevData) => ({
            ...prevData,
            skills: FullSummaryObj.skills,
          }));
          setSaveButton("Save");
        } catch (error) {
          console.error('Error reading the CV file:', error);
        }
      } else {
        // Clear the CV fields if no file is selected
        setFormData((prevData) => ({
          ...prevData,
          cv: null,
          cvText: '',
        }));
      }
    } else if (name === 'summary') {
      setEditedSummary(value);
    } else if (name.startsWith('skills.')) {
      // Handle changes for skills drop-downs
      const skillName = name.split('.')[1];
      const skillValue = value;
  
      setFormData((prevData) => ({
        ...prevData,
        skills: {
          ...prevData.skills,
          [skillName]: skillValue,
        },
      }));
    } else {
      // For other input fields (name, etc.), update them directly
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  const extractTextFromPDF = async (pdfFile) => {
    try {
      const pdfjs = require('pdfjs-dist/build/pdf');
      const pdfData = new Uint8Array(await pdfFile.arrayBuffer());
      const loadingTask = pdfjs.getDocument({ data: pdfData });
      const pdfDocument = await loadingTask.promise;
      const numPages = pdfDocument.numPages;
      let text = '';

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdfDocument.getPage(pageNum);
        const pageText = await page.getTextContent();
        text += pageText.items.map((item) => item.str).join(' ');
      }

      return text;
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw error;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  setSaveButton("Saved");
    try {
      // Update the user's display name in Firebase Authentication
      await updateProfile(auth.currentUser, {
        displayName: formData.name,
      });
  
      // Create a JSON object based on the updated data
      const jsonDescription = JSON.stringify({
        summary: editedSummary, // Use the edited summary text
        skills: formData.skills,
      });
  
      // Use the user's email as the document ID in Firestore
      const userDocRef = doc(collection(database, 'Users'), auth.currentUser.email);
  
      // Check if the document already exists
      const docSnapshot = await getDoc(userDocRef);
  
      if (docSnapshot.exists()) {
        // Update the existing Firestore document
        await setDoc(userDocRef, {
          description: jsonDescription,
          email: auth.currentUser.email,
          'display_name': formData.name,
        }, { merge: true });
        console.log('Firestore document updated');
        setUpdated("updated")
      } else {
        // Create a new document for the user
        await setDoc(userDocRef, {
          description: jsonDescription,
          email: auth.currentUser.email,
          'display_name': formData.name,
        });
        
        console.log('New Firestore document created');

        window.location.reload()
      }
    } catch (error) {
      console.error('Error updating profile and Firestore document:', error);
    }
  };
  
  return (
    <div className="scrollbar scrollbar-juicy-peach flex flex-col bg-metal p-10 items-center rounded-lg" style={{ width: '50%', height: summary ? '80%': '55%', maxHeight: '1000px', overflowY: 'auto' }}>
      <h1 className="font-semibold text-3xl text-center mb-7 text-bone">Profile Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center">
        <input
          type="text"
          className="mb-5 p-2 w-full rounded-md bg-bone"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Display Name"
        />
        <input
          type="file"
          accept=".pdf"
          className="mb-5 p-2 w-full rounded-md bg-bone"
          name="cv"
          onChange={handleInputChange}
          placeholder="Upload CV (PDF only)"
        />
        {summary && (
          <textarea
          rows="4"
          className="scrollbar-juicy-peach mb-5 p-2 w-full rounded-md bg-bone"
          name="summary"
          value={editedSummary} 
          onChange={handleInputChange}
          placeholder="Summary"
        />
        
        )}
        <div className="mb-5">
          {summary && (
            <h2 className="text-bone text-lg font-semibold mb-2">Skills</h2>
          )}
          {Object.keys(formData.skills).map((skill) => (
            <div key={skill} className="mb-3">
              <label htmlFor={`skills.${skill}`} className="text-bone font-medium">{skill}</label>
              <select
  name={`skills.${skill}`}
  value={formData.skills[skill]}
  onChange={handleInputChange}
  className="rounded-md w-full p-2"
>
  {skillLevels.map((level) => (
    <option key={level} value={level} className="hover:bg-grass">
      {level}
    </option>
  ))}
</select>

            </div>
          ))}
        </div>
        <button className="text-bone bg-grass font-semibold text-lg px-8 py-2 w-30 rounded-md" type="submit">
          {saveButton}
        </button>
      </div>
    </form>
  </div>
  );
};

export default ProfileSettingsBox;
