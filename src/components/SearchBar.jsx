import React, { useState } from "react";
import styles from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleBtnClick = (e) => {
    navigate("/searchpage", { state: { defaultValue: searchValue } });
    setSearchValue("");
  };

  return (
    <div className={styles.searchGo}>
      <input
        className={styles.searchBar}
        placeholder="   Search Fishbook..."
        onChange={handleChange}
        value={searchValue}
      ></input>
      <button className={styles.navSearchBtn} onClick={handleBtnClick}>
        &#8594;
      </button>
    </div>
  );
};

export default SearchBar;
