import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active, // Initialize the active state with the prop value
    };
  }

  // Update the active state when the prop changes
  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active) {
      this.setState({ active: this.props.active });
    }
  }

  render() {
    const { active } = this.state; // Get the active state

    return (
      <nav className="h-max transition-colors ml-auto text-3xl font-semibold">
        <ul className="flex flex-row">
          <li>
            <Link
              className={`text-bone mr-10 hover:text-sky duration-300 ${active === "home" ? "text-sky" : ""}`}
              to="/"
            >
            Home
            </Link>
          </li>
          <li>
            <Link
              className={`text-bone mr-10 hover:text-sky duration-300 ${active === "search" ? "text-sky" : ""}`}
              to="/Search"
            >
            Search
            </Link>
          </li>
          <li>
            <Link
              className={`text-bone hover:text-sky duration-300 ${active === "login" ? "text-sky" : ""}`}
              to="/Login"
            >
            Login
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
