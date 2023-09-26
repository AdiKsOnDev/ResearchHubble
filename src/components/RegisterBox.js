import React, { useState } from 'react';
import { ReactComponent as GoogleSvg } from '../Assets/google-icon.svg';
import { auth, provider } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const RegisterBox = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    error: '',
  });

  const navigate = useNavigate();

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

    const { email, password, passwordConfirm } = formData;

    // Basic validation - check if email and password are not empty
    if (!email || !password) {
      setFormData({ ...formData, error: 'Please enter E-Mail AND Password' });
      return;
    } else if(password.length < 8) {
      setFormData({ ...formData, error: 'Password\'s length should be at least 8 characters'})
      return;
    } else if (password != passwordConfirm) {
      setFormData({ ...formData, error: 'Passwords are not matching' });
      return;
    }

    // You can add your authentication logic here
    // For this example, we'll just log the entered email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate("/Login");

        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);

        // Reset the form fields
        setFormData({ email: '', password: '', passwordConfirm: '', error: "E-Mail is already in use" });
        return;
      });
  };

  const googleAuth = () => {
    console.log("HEHE");
    auth.signInWithPopup(provider);
  };

  const { email, password, passwordConfirm, error } = formData;

  return (
    <div className="flex flex-col bg-metal w-fit p-10 items-center rounded-lg">
      <h2 className="font-semibold text-center mb-7 text-3xl text-bone">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center">
          <input
            type="text"
            className='mb-5 p-2 rounded-md bg-bone'
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder='Email'
          />

          <input
            type="password"
            className='mb-5 p-2 rounded-md bg-bone'
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            placeholder='Password'
          />

          <input
            type="password"
            className='mb-5 p-2 rounded-md bg-bone'
            id="passwordConfirm"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handleInputChange}
            placeholder='Confirm Password'
          />

          {error && <p className="text-blood italic mb-5 text-xs">{error}</p>}

          <button className="text-bone bg-grass font-semibold text-lg px-8 py-2 w-30 rounded-md mb-5" type="submit">Sign Up</button>

          <h1 className='font-semibold text-3xl text-bone mb-5'>OR</h1>
        </div>
      </form>

      <button className="flex flex-row items-center text-midnight text-lg text-left bg-bone font-semibold px-5 w-full rounded-md" onClick={googleAuth}>
        <GoogleSvg className='w-7 mr-8' />
        <h1>Sign Up using Google</h1>
      </button>
    </div>
  );
};

export default RegisterBox;
