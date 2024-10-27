import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CreatePostModal = (props) => {
  const location = useLocation();
  const defaultValue = location.state?.defaultValue || "Select a catch";
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({
    fishtype: "",
    location: "",
    date: "",
    status: "",
    fightrate: "",
    msg: "",
    "Table 1": "",
    img: "./images/fishbook-logo.png",
  });
  const [usersData, setUsersData] = useState([]);
  const [fishesData, setFishesData] = useState([]);
  const [validation, setValidation] = useState(false);
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

      const fishWithConservationStatus = data.filter(
        (fishData) => fishData.meta && fishData.meta.conservation_status
      ); //grab only fishes with conservation status

      setFishesData(fishWithConservationStatus);
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
    if (
      !newPost.fishtype ||
      !newPost["Table 1"] ||
      !newPost.date ||
      !newPost.location
    ) {
      alert("Please fill in all fields.");
      return;
    }
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
        img: "./images/fishbook-logo.png",
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
      (user) => user.fields.username === e.target.value
    );
    if (user) {
      setValidation(true);
      setNewPost((prevPost) => ({ ...prevPost, ["Table 1"]: user.id }));
    } else {
      setValidation(false);
      setNewPost((prevPost) => ({ ...prevPost, ["Table 1"]: "" }));
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    getFishesData();
    getUsersData();
  }, []);

  return (
    <div className="createPostDisplay">
      <h1 style={{ width: "350px", textAlign: "center" }}>
        Share your awesome catch
      </h1>
      <div className="createPostForm">
        <div className="createPostInput">
          <label>Upload your catch: </label>
          <input name="img" type="file" />
        </div>
        <div className="createPostInput">
          <label>Username: </label>
          <input
            name="username"
            placeholder="Enter your username"
            value={nameInput}
            onChange={handleNameChange}
          />
          <div>
            {validation ? (
              <p style={{ color: "green" }}>Valid User</p>
            ) : (
              <p style={{ color: "red" }}>Invalid User</p>
            )}
          </div>
        </div>
        <div className="createPostInput">
          <label>Species: </label>
          <select
            name="fishtype"
            type="text"
            onChange={handleFishChange}
            value={newPost.fishtype || defaultValue}
          >
            <option value={defaultValue}>{defaultValue}</option>
            {fishesData.map((fishData, idx) => {
              return (
                <option key={idx} value={fishData.name}>
                  {fishData.name}
                </option>
              );
            })}
          </select>
          <p style={{ color: "green" }}>{fishStatus}</p>
        </div>
        <div className="createPostInput">
          <label>Location: </label>
          <input
            name="location"
            type="text"
            placeholder="Enter location"
            value={newPost.location}
            onChange={handleChange}
          />
        </div>
        <div className="createPostInput">
          <label>Date: </label>
          <input
            name="date"
            type="date"
            placeholder="DD/MM/YY"
            value={newPost.date}
            onChange={handleChange}
          />
        </div>
        <div className="createPostInput">
          <label>Rate the fight:</label>
          <div className="fightRateBtn">
            <select
              name="fightrate"
              value={newPost.fightrate}
              onChange={handleChange}
            >
              <option value="">Select a rating</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Challenging">Challenging</option>
              <option value="Intense">Intense</option>
              <option value="Brutal">Brutal</option>
            </select>
          </div>
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
            <button className="questModalBtn" onClick={addPost}>
              Create Post!
            </button>
            <button className="questModalBtn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
