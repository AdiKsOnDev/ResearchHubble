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
      <div className="bg-slate-800 text-slate-50 w-fit">
        <h2 className="font-semibold">Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
            />
          </div>
          
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginBox;
