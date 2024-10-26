import React, { useState, useEffect } from "react";
import Button from "./Button";
import { Navigate, useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({
    fishtype: "",
    location: "",
    date: "",
    fightrate: "",
    msg: "",
    "Table 1": "",
    img: "./images/fishbook-logo.png",
  });
  const [usersData, setUsersData] = useState([]);
  const [fishesData, setFishesData] = useState([]);

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
            date: newPost.date,
            fightrate: Number(newPost.fightrate),
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
        date: "",
        fightrate: "",
        msg: "",
        "Table 1": "",
        img: "./images/fishbook-logo.png",
      });
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
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
          <input name="img" type="file" onChange={handleChange} />
        </div>
        <div className="createPostInput">
          <label>User: </label>
          <select
            name="Table 1"
            onChange={handleChange}
            value={newPost["Table 1"]}
          >
            <option value="">Select your Username</option>
            {usersData.map((userData, idx) => {
              return (
                <option key={idx} value={userData.id}>
                  {userData.fields.username}
                </option>
              );
            })}
          </select>
        </div>
        <div className="createPostInput">
          <label>Species: </label>
          <select
            name="fishtype"
            type="text"
            onChange={handleChange}
            value={newPost.fishtype}
          >
            <option value="">Select a Catch</option>
            {fishesData.map((fishData, idx) => {
              return (
                <option key={idx} value={fishData.name}>
                  {fishData.name}
                </option>
              );
            })}
          </select>
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
              <option value="1">1 - Easy</option>
              <option value="2">2 - Moderate</option>
              <option value="3">3 - Challenging</option>
              <option value="4">4 - Intense</option>
              <option value="5">5 - Brutal</option>
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
        </div>
        <Button func={addPost}>Submit</Button>
      </div>
    </div>
  );
};

export default CreatePost;
