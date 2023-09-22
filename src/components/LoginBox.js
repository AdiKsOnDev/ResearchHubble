import React, { Component } from 'react';
import '../styles.css'

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
      this.setState({ error: 'Please enter both username and password.' });
      return;
    }

    // You can add your authentication logic here
    // For this example, we'll just log the entered username and password
    console.log('Username:', username);
    console.log('Password:', password);

    // Reset the form fields
    this.setState({ username: '', password: '' });
  };

  render() {
    const { username, password, error } = this.state;

    return (
      <div className="bg-metal w-fit p-10 items-center rounded-lg">
        <h2 className="font-semibold text-center mb-7 text-3xl text-bone">Sign In</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="flex flex-col justify-center items-center">
            <input
              type="text"
              className='mb-4 p-2 rounded-md bg-bone'
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
          
            {error && <p className="error">{error}</p>}
            <button className="text-bone bg-grass font-semibold p-1 w-20 rounded-md" type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginBox;
