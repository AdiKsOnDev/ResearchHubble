import React, { Component } from "react";
import { Link } from "react-router-dom";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

class Navbar extends Component {
  constructor(props) {
    super(props);
    const user = auth.currentUser;
    
    this.state = {
      active: props.active,
      userID: user ? user.uid : "",
    };
  }

  render() {
    const { active, userID } = this.state;
  
    return (
      <nav className="h-max transition-colors ml-auto text-3xl font-semibold">
        <ul className="flex flex-row">
          <li>
            <Link
              className={`text-bone mr-10 hover:text-sky duration-300 ${
                active === "home" ? "text-sky" : ""
              }`}
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`text-bone mr-10 hover:text-sky duration-300 ${
                active === "search" ? "text-sky" : ""
              }`}
              to="/Search"
            >
              Search
            </Link>
          </li>
          <li>
            {userID === "" ? <LoginButton active={active} /> : <LogoutButton auth={auth} />}
          </li>
        </ul>
      </nav>
    );
  }
  
}

export default Navbar;