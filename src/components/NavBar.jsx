import React from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className={styles.navBarContainer}>
      <ul className={styles.ul}>
        <li>
          <img src="../images/fishbook-logo.png" style={{ width: "45%" }} />
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
        <div className={styles.searchGo}>
          <input
            className={styles.searchBar}
            placeholder="   Search FishBook..."
          ></input>
          <button className={styles.navSearchBtn}>&#8594;</button>
        </div>
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
