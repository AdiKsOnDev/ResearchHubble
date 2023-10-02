import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Navbar = ({ active }) => {
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserID(user.uid);
      } else {
        setUserID("");
      }
    });

    return () => unsubscribe();
  }, []);

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
};

export default Navbar;
