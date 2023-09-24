import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {  } 

  render() { 
    return (
      <nav className="h-max transition-colors ml-auto text-3xl font-semibold">
        <ul className="flex flex-row">
          <li>
            <Link className="text-bone mr-10 hover:text-sky duration-300" to="/">Home</Link>
          </li>
          <li>
            <Link className="text-bone mr-10 hover:text-sky duration-300" to="/Search">Search</Link>
          </li>
          <li>
            <Link className="text-bone hover:text-sky duration-300" to="/Login">Login</Link>
          </li>
        </ul>
    </nav>
    );
  }
}

export default Navbar;