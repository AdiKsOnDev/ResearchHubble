import React, { Component } from 'react';
import { ReactComponent as GoogleSvg } from '../Assets/google-icon.svg';
import { auth, provider } from '../firebase';

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      error: '', // Clear any previous errors when the user starts typing
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    // Basic validation - check if username and password are not empty
    if (!username || !password) {
      this.setState({ error: 'Wrong E-Mail OR Password' });
      return;
    }

    // You can add your authentication logic here
    // For this example, we'll just log the entered username and password
    console.log('Username:', username);
    console.log('Password:', password);

    // Reset the form fields
    this.setState({ username: '', password: '' });
  };

  auth = (e) => {
    console.log("HEHE");
    auth.signInWithPopup(provider);
  }

  render() {
    const { username, password, error } = this.state;

    return (
      <div className="bg-metal w-fit p-10 items-center rounded-lg">
        <h2 className="font-semibold text-center mb-7 text-3xl text-bone">Sign In</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="flex flex-col justify-center items-center">
            <input
              type="text"
              className='mb-5 p-2 rounded-md bg-bone'
              id="username"
              name="username"
              value={username}
              onChange={this.handleInputChange}
              placeholder='Username'
            />

            <input
              type="password"
              className='mb-5 p-2 rounded-md bg-bone'
              id="password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
              placeholder='Password'
            />
          
            {error && <p className="text-blood italic mb-5 text-xs">{error}</p>}

            <button className="text-bone bg-grass font-semibold text-lg px-8 py-2 w-30 rounded-md mb-5" type="submit">Login</button>

            <h1 className='font-semibold text-3xl text-bone mb-5'>OR</h1>
            
            <button className="flex flex-row items-center text-midnight text-lg text-left bg-bone font-semibold px-5 w-full rounded-md" onClick={this.auth}>
              <GoogleSvg className='w-7 mr-8' /> 
              <h1>Sign in using Google</h1>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginBox;
