import React, { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./JoinUs.module.css";
import Button from "../Button";
import UploadImage from "../UploadImage";

const JoinUs = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [validation, setValidation] = useState("");
  const [newUserInput, setNewUserInput] = useState({
    username: "",
    age: "",
    country: "",
    msg: "",
    img: "./images/fishbook-logo.png",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserInput((prevUserInput) => ({ ...prevUserInput, [name]: value }));
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setNewUserInput((prevUserInput) => ({ ...prevUserInput, [name]: value }));
    if (value === "") {
      setValidation("");
    } else if (
      userData.find(
        (user) => user.fields.username.toLowerCase() === value.toLowerCase() //REMOVE SPACES
      )
    ) {
      setValidation("Unavailable");
    } else setValidation("Available");
  };

  const handleImgChange = (url) => {
    setNewUserInput((prevUserInput) => ({ ...prevUserInput, img: url }));
  };

  const getUserData = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_USERSERVER + "?maxRecords=100&view=Grid%20view",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_USERAPI_KEY}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("getting data error");
      }
      const data = await res.json();
      setUserData(data.records);
    } catch (error) {
      console.error(error.message);
    }
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
              img: newUserInput.img,
              anglerstatus: "Beginner",
            },
          }),
        }
      );
      if (!res.ok) {
        throw new Error("getting data error");
      }
      setNewUserInput({
        username: "",
        age: "",
        country: "",
        msg: "",
        img: "./images/fishbook-logo.png",
      });
      navigate("/userprofiles");
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={styles.div}>
      <h1 style={{ width: "350px", textAlign: "center" }}>
        Join our community of Anglers today
      </h1>
      <div className={styles.formContainer}>
        <div className={styles.uploadPhoto}>
          <h1>UPLOAD PHOTO HERE</h1>
          <UploadImage
            photoContainer={styles.photoContainer}
            func={handleImgChange}
            msg="Upload your profile photo"
          />
        </div>
        <div className={styles.forms}>
          <label htmlFor="username">Username: </label>
          <input
            name="username"
            value={newUserInput.username}
            placeholder="Enter a username"
            type="text"
            onChange={handleUserChange}
          />
          {validation === "Available" ? (
            <p style={{ color: "green" }}>Available</p>
          ) : validation === "Unavailable" ? (
            <p style={{ color: "red" }}>Unavailable</p>
          ) : (
            <p></p>
          )}
        </div>
        <div className={styles.forms} style={{ marginTop: "-20px" }}>
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
