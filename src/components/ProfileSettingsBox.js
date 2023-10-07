import React, { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import CVProcess from './scripts/CVProcess';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
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
  const [summary, setSummary] = useState('');
  const handleInputChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === 'cv') {
      const cvFile = files[0];

      if (cvFile) {
        try {
          const cvText = await extractTextFromPDF(cvFile);
          setFormData({
            ...formData,
            cv: cvFile,
            cvText: cvText,
          });
          const newSummary = await CVProcess(cvText);
          const FullSummaryObj = JSON.parse(newSummary);
          setSummary(FullSummaryObj.summary);
          setFormData((prevFormData) => ({
            ...prevFormData,
            skills: FullSummaryObj.skills,
          }));
        } catch (error) {
          console.error('Error reading the CV file:', error);
        }
      } else {
        setFormData({
          ...formData,
          cv: null,
          cvText: '',
        });
        setSummary('');
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
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
  
    try {
      // Update the user's display name in Firebase Authentication
      await updateProfile(auth.currentUser, {
        displayName: formData.name,
      });
  
      // Create a JSON object based on the updated data
      const jsonDescription = JSON.stringify({
        summary: formData.cvText,
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
          'display-name': formData.name,
        }, { merge: true });
        console.log('Firestore document updated');
      } else {
        // Create a new document for the user
        await setDoc(userDocRef, {
          description: jsonDescription,
          email: auth.currentUser.email,
          'display-name': formData.name,
        });
        console.log('New Firestore document created');
      }
    } catch (error) {
      console.error('Error updating profile and Firestore document:', error);
    }
  };
  
  

  return (
    <div className="flex flex-col bg-metal p-10 items-center rounded-lg">
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
              className="mb-5 p-2 w-full rounded-md bg-bone"
              name="summary"
              value={summary}
              onChange={handleInputChange}
              placeholder="Summary"
            />
          )}
          <div className="mb-5">
            {summary && (
            <h2 className="text-bone text-lg font-semibold mb-2">Skills</h2>)
}
            {Object.keys(formData.skills).map((skill) => (
              <div key={skill} className="mb-3">
                <label htmlFor={`skills.${skill}`} className="text-bone font-medium">{skill}</label>
                <select
                  name={`skills.${skill}`}
                  value={formData.skills[skill]}
                  onChange={handleInputChange}
                  className="rounded-md bg-bone w-full p-2"
                >
                  {skillLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <button className="text-bone bg-grass font-semibold text-lg px-8 py-2 w-30 rounded-md" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettingsBox;
