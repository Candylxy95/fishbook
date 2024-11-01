import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./JoinUs.module.css";
import UploadImage from "../UploadImage";
import TypographyHeader from "../TypographyHeader";

const JoinUs = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [validation, setValidation] = useState("");
  const [newUserInput, setNewUserInput] = useState({
    username: "",
    age: "",
    country: "",
    msg: "",
    img: "/images/fishbook-logo.png",
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
    } else if (value.includes(" ")) {
      setValidation("Spaces");
    } else if (
      userData.find(
        (user) => user.fields.username.toLowerCase() === value.toLowerCase()
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
        img: "/images/fishbook-logo.png",
      });
      navigate("/userprofiles");
    } catch (error) {
      console.error(error.message);
    }
  };

  const addControlledUserInput = () => {
    if (
      validation === "Available" &&
      newUserInput.username &&
      newUserInput.country &&
      newUserInput.msg &&
      Number(newUserInput.age)
    ) {
      addUserInput();
    } else
      alert(
        "Ensure all fields are filled with valid values, and age is a number"
      );
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={styles.div}>
      <TypographyHeader
        headerMsg={"Join our community of Anglers today"}
        speed={50}
        repeat={0}
        fontstyle={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "40px",
          fontWeight: "600",
          color: "var(--black)",
        }}
      />
      <div className={styles.formContainer}>
        <div className={styles.uploadPhoto}>
          <h1>Upload profile photo</h1>
          <UploadImage
            photoContainer={"photoContainer"}
            func={handleImgChange}
            msg="Upload your profile photo"
          />
        </div>
        <div className={styles.secContainer}>
          <div className={styles.forms}>
            <input
              name="username"
              value={newUserInput.username}
              placeholder="Enter a username"
              type="text"
              onChange={handleUserChange}
            />
            {validation === "Available" ? (
              <p style={{ color: "green", paddingLeft: "15px" }}>Available</p>
            ) : validation === "Unavailable" ? (
              <p style={{ color: "red", paddingLeft: "15px" }}>Unavailable</p>
            ) : validation === "Spaces" ? (
              <p style={{ color: "red", paddingLeft: "15px" }}>
                Spaces not allowed
              </p>
            ) : (
              <p></p>
            )}
          </div>
          <div className={styles.forms} style={{ marginTop: "-20px" }}>
            <input
              name="age"
              value={newUserInput.age}
              placeholder="Enter your age"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div className={styles.forms}>
            <input
              name="country"
              value={newUserInput.country}
              placeholder="Enter location"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div className={styles.forms}>
            <textarea
              name="msg"
              value={newUserInput.msg}
              placeholder="Share a little more about yourself with the community"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div className={styles.forms} style={{ textAlign: "center" }}>
            <button
              className={styles.joinNowBtn}
              onClick={addControlledUserInput}
            >
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default JoinUs;
