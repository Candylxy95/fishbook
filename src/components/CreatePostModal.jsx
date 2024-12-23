import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UploadImage from "./UploadImage";

const CreatePostModal = () => {
  const location = useLocation();
  const defaultValue = location.state?.defaultValue || "";
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({
    fishtype: defaultValue,
    location: "",
    date: "",
    status: "",
    fightrate: "",
    msg: "",
    "Table 1": "",
    img: "/images/fishbook-logo.png",
  });
  const [usersData, setUsersData] = useState([]);
  const [fishesData, setFishesData] = useState([]);
  const [validation, setValidation] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [fishStatus, setFishStatus] = useState("");

  const getFishesData = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/fishes", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "fish-species.p.rapidapi.com",
          "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
        },
      });

      if (!res.ok) {
        throw new Error("no fishy data for you");
      }
      const data = await res.json();
      setFishesData(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getUsersData = async () => {
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
      setUsersData(data.records);
    } catch (error) {
      console.error(error.message);
    }
  };

  const addPost = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_USERPOSTS, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_USERAPI_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            fishtype: newPost.fishtype,
            location: newPost.location,
            status: fishStatus,
            date: newPost.date,
            fightrate: newPost.fightrate,
            msg: newPost.msg,
            img: newPost.img,
            "Table 1": [newPost["Table 1"]],
          },
        }),
      });
      if (!res.ok) {
        throw new Error("getting data error");
      }
      setNewPost({
        fishtype: "",
        location: "",
        status: "",
        date: "",
        fightrate: "",
        msg: "",
        "Table 1": "",
        img: "/images/fishbook-logo.png",
      });
      setNameInput("");
      setFishStatus("");
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleImgChange = (url) => {
    setNewPost((prevPost) => ({ ...prevPost, img: url }));
  };

  const handleFishChange = (e) => {
    const { name, value } = e.target;
    const fish = fishesData.find((fish) => fish.name === e.target.value);
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
    let status = "";
    if (fish && fish.meta.conservation_status?.includes("Least Concern")) {
      status = "Abundant";
    } else if (fish && fish.meta.conservation_status?.includes("secure")) {
      status = "Common";
    } else if (
      fish &&
      fish.meta.conservation_status?.includes("Near Threatened")
    ) {
      status = "Uncommon";
    } else if (fish && fish.meta.conservation_status?.includes("Vulnerable")) {
      status = "Rare";
    } else if (fish && fish.meta.conservation_status?.includes("Endangered")) {
      status = "Very Rare";
    } else if (
      fish &&
      fish.meta.conservation_status?.includes("Critically Endangered")
    ) {
      status = "Extremely Rare";
    } else if (fish) {
      status = "Mysterious";
    } else {
      status = "";
    }
    setFishStatus(status);
  };

  const handleNameChange = (e) => {
    setNameInput(e.target.value);
    const user = usersData.find(
      (user) =>
        user.fields.username.toLowerCase() === e.target.value.toLowerCase()
    );
    if (user) {
      setValidation("Valid User");
      setNewPost((prevPost) => ({ ...prevPost, ["Table 1"]: user.id }));
    } else {
      setValidation(e.target.value === "" ? "" : "Invalid User");
      if (e.target.value !== "") {
        setNewPost((prevPost) => ({ ...prevPost, ["Table 1"]: "" }));
      }
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleCreateBtn = () => {
    if (
      !newPost.fishtype ||
      !newPost["Table 1"] ||
      !newPost.date ||
      !newPost.location ||
      validation !== "Valid User"
    ) {
      alert("Ensure all fields are filled with valid values.");
      return;
    }
    addPost();
  };

  useEffect(() => {
    getFishesData();
    getUsersData();
  }, []);

  useEffect(() => {
    if (fishesData.length > 0 && defaultValue) {
      handleFishChange({ target: { name: "fishtype", value: defaultValue } });
    }
  }, [fishesData, defaultValue]);

  return (
    <div className="createPostDisplay">
      <div className="createPostForm">
        <div>
          <div className="createPostInput">
            <h1 style={{ textAlign: "center" }}>Share your awesome catch</h1>
            <UploadImage
              photoContainer="photoContainer"
              msg="Upload your catch"
              func={handleImgChange}
            />
          </div>
        </div>
        <div>
          <div className="createPostInput">
            <input
              name="username"
              placeholder="Username"
              value={nameInput}
              onChange={handleNameChange}
            />
            <div style={{ paddingLeft: "15px" }}>
              {validation === "Valid User" ? (
                <p style={{ color: "green" }}>{validation}</p>
              ) : validation === "Invalid User" ? (
                <p style={{ color: "red" }}>Invalid User</p>
              ) : (
                <p></p>
              )}
            </div>
          </div>
          <div className="createPostInput">
            <select
              name="fishtype"
              type="text"
              onChange={handleFishChange}
              value={newPost.fishtype}
            >
              <option value={defaultValue}>
                {defaultValue || "Select a Catch"}
              </option>
              {fishesData
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((fishData) => {
                  return (
                    <option key={fishData.id} value={fishData.name}>
                      {fishData.name}
                    </option>
                  );
                })}
            </select>
            {fishStatus === "Abundant" ? (
              <p style={{ color: "#2B9EB3", paddingLeft: "15px" }}>
                {fishStatus}
              </p>
            ) : fishStatus === "Common" ? (
              <p style={{ color: "#78C247", paddingLeft: "15px" }}>
                {fishStatus}
              </p>
            ) : fishStatus === "Uncommon" ? (
              <p style={{ color: "#CFD11A", paddingLeft: "15px" }}>
                {fishStatus}
              </p>
            ) : fishStatus === "Vulnerable" ? (
              <p style={{ color: "#D9594C", paddingLeft: "15px" }}>
                {fishStatus}
              </p>
            ) : fishStatus === "Very Rare" ? (
              <p style={{ color: "#F84887", paddingLeft: "15px" }}>
                {fishStatus}
              </p>
            ) : fishStatus === "Extremely Rare" ? (
              <p style={{ color: "#FFC60A", paddingLeft: "15px" }}>
                {fishStatus}
              </p>
            ) : (
              <p style={{ color: "#553EA3", paddingLeft: "15px" }}>
                {fishStatus}
              </p>
            )}
          </div>
          <div className="createPostInput">
            <input
              name="location"
              type="text"
              placeholder="Location"
              value={newPost.location}
              onChange={handleChange}
            />
          </div>
          <div className="createPostInput">
            <input
              name="date"
              type="date"
              value={newPost.date}
              onChange={handleChange}
            />
          </div>
          <div className="createPostInput">
            <select
              name="fightrate"
              value={newPost.fightrate}
              onChange={handleChange}
            >
              <option value="">Select a fight rate</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Challenging">Challenging</option>
              <option value="Intense">Intense</option>
              <option value="Brutal">Brutal</option>
            </select>
          </div>
          <div className="createPostInput">
            <textarea
              name="msg"
              type="text"
              placeholder="Share something about your catch"
              onChange={handleChange}
              value={newPost.msg}
            />
            <div className="questModalBtnContainer">
              <button className="questModalBtn" onClick={handleCreateBtn}>
                Create
              </button>
              <button className="questModalBtn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
