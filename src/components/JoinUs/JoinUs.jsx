import React, { useState, useRef, useEffect } from "react";
import styles from "./JoinUs.module.css";
import Button from "../Button";

const JoinUs = () => {
  const [newUserInput, setNewUserInput] = useState({
    username: "",
    age: "",
    country: "",
    msg: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserInput((prevUserInput) => ({ ...prevUserInput, [name]: value }));
  };

  const addUserInput = async () => {
    try {
      const res = await fetch(
        "https://api.airtable.com/v0/appR2Hch1IfYryo6Y/Table%201",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_USERAPI_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              username: newUserInput.username,
              age: Number(newUserInput.age),
              country: newUserInput.country,
              msg: newUserInput.msg,
            },
          }),
        }
      );
      if (!res.ok) {
        throw new Error("getting data error");
      }
      setNewUserInput({ username: "", age: "", country: "", msg: "" });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={styles.div}>
      <h1>Join millions of Anglers today</h1>
      <div className={styles.formContainer}>
        <div className={styles.uploadPhoto}>
          <h1>UPLOAD PHOTO HERE</h1>
        </div>
        <div className={styles.forms}>
          <label htmlFor="username">Username: </label>
          <input
            name="username"
            value={newUserInput.username}
            placeholder="Enter a username"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className={styles.forms}>
          <label htmlFor="age">Age: </label>
          <input
            name="age"
            value={newUserInput.age}
            placeholder="Enter your age"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className={styles.forms}>
          <label htmlFor="country">Country: </label>
          <input
            name="country"
            value={newUserInput.country}
            placeholder="Enter location"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className={styles.forms}>
          <label htmlFor="msg">Describe yourself: </label>
          <textarea
            name="msg"
            value={newUserInput.msg}
            placeholder="Share a little more about yourself with the community"
            type="text"
            onChange={handleChange}
          />
        </div>
        <Button
          func={() =>
            newUserInput.username &&
            newUserInput.country &&
            newUserInput.msg &&
            Number(newUserInput.age)
              ? addUserInput()
              : alert("Please fill in all fields and enter number for age")
          }
        >
          Join Now!
        </Button>
      </div>
    </div>
  );
};
export default JoinUs;
