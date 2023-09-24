import React, { useState } from 'react';
import { ReactComponent as GoogleSvg } from '../Assets/google-icon.svg';
import { auth, provider } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginBox = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    const { email, password } = formData;

    // Basic validation - check if email and password are not empty
    if (!email || !password) {
      setFormData({ ...formData, error: 'Please enter E-Mail AND Password' });
      return;
    }

    // You can add your authentication logic here
    // For this example, we'll just log the entered email and password
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate("/");

        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);

        // Reset the form fields
        setFormData({ email: '', password: '', error: "Wrong E-Mail OR Password" });
        return;
      });
  };

  const googleAuth = () => {
    console.log("HEHE");
    auth.signInWithPopup(provider);
  };

  const { email, password, error } = formData;

  return (
    <div className="bg-metal w-fit p-10 items-center rounded-lg">
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

          {error && <p className="text-blood italic mb-5 text-xs">{error}</p>}

          <button className="text-bone bg-grass font-semibold text-lg px-8 py-2 w-30 rounded-md mb-5" type="submit">Login</button>

          <h1 className='font-semibold text-3xl text-bone mb-5'>OR</h1>

          <button className="flex flex-row items-center text-midnight text-lg text-left bg-bone font-semibold px-5 w-full rounded-md" onClick={googleAuth}>
            <GoogleSvg className='w-7 mr-8' />
            <h1>Sign in using Google</h1>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginBox;
