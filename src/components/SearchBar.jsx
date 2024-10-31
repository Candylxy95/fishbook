import React, { useState } from "react";
import styles from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState([]);
  const [noValue, setNoValue] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    setNoValue(false);
  };

  const handleBtnClick = (e) => {
    navigate("/searchpage", { state: { defaultValue: searchValue } });
    setSearchValue("");
    setNoValue(true);
  };

  return (
    <div className={styles.searchGo}>
      <input
        className={styles.searchBar}
        placeholder="Search Fishbook..."
        onChange={handleChange}
        value={searchValue}
      ></input>
      <button
        className={styles.navSearchBtn}
        disabled={noValue}
        onClick={handleBtnClick}
      >
        &#8594;
      </button>
    </div>
  );
};

export default SearchBar;
