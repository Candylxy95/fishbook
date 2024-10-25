import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div className="mb-4"></div>
      <ul className={styles.ul}>
        <li>
          <NavLink
            className={(navLink) => (navLink.isActive ? styles.active : "")}
            to="/"
          >
            Join Us
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navLink) => {
              navLink.isActive ? styles.active : "";
            }}
            to="/fishfinder"
          >
            Fish Finder
          </NavLink>
        </li>
        <li>
          <img src="./images/fishbook-logo.png" style={{ width: "25%" }} />
          <h1>FISHBOOK</h1>
        </li>
        <li>
          <NavLink
            className={(navLink) => (navLink.isActive ? styles.active : "")}
            to="/"
          >
            Angler Community
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navLink) => (navLink.isActive ? styles.active : "")}
            to="/"
          >
            Create Post
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
