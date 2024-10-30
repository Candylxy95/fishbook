import React from "react";
import styles from "./NavBar.module.css";
import { NavLink, Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const NavBar = () => {
  return (
    <div className={styles.navBarContainer}>
      <ul className={styles.ul}>
        <li>
          <Link to="/">
            <img src="../images/fishbook-logo.png" style={{ width: "45%" }} />
          </Link>
        </li>
        <li>
          <NavLink
            className={(navLink) => (navLink.isActive ? styles.active : "")}
            to="/joinus"
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

        <SearchBar />
        <li>
          <NavLink
            className={(navLink) => (navLink.isActive ? styles.active : "")}
            to="/userprofiles"
          >
            Community
          </NavLink>
        </li>
        <li
          style={{
            backgroundColor: "orangered",
            borderRadius: "20px",
            height: "40px",
            alignContent: "center",
          }}
        >
          <NavLink
            className={(navLink) => (navLink.isActive ? styles.active : "")}
            style={{ color: "white" }}
            to="/createpost"
          >
            Create Post
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
