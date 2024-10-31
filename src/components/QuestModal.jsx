import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import LoadingSpinner from "./LoadingSpinner";

const QuestOverlay = (props) => {
  const [userData, setUserData] = useState([]);
  const [input, setInput] = useState("");
  const [validation, setValidation] = useState("");
  const [questList, setQuestList] = useState([]);
  const [questValid, setQuestValid] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getQuestData = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_USERQUESTS + "?maxRecords=100&view=Grid%20view",
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
      setQuestList(data.records);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const addQuestData = async (userId) => {
    try {
      const res = await fetch(import.meta.env.VITE_USERQUESTS, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_USERAPI_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                fishquest: props.fishtype,
                "Table 1": [userId],
              },
            },
          ],
        }),
      });
      if (!res.ok) {
        throw new Error("getting data error");
      }
      props.setShowQuestModal(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    const user = userData.find(
      (user) =>
        user.fields.username.toLowerCase() === e.target.value.toLowerCase()
    );
    if (user) {
      setValidation("Valid User");

      const quest = questList.find(
        (quest) =>
          quest.fields["Table 1"]?.includes(user.id) &&
          quest.fields.fishquest === props.fishtype
      );

      setQuestValid(!quest);
    } else {
      setValidation(e.target.value === "" ? "" : "Invalid User");
      setQuestValid(false);
    }
  };

  const handleClick = () => {
    const user = userData.find(
      (user) => user.fields.username.toLowerCase() === input.toLowerCase()
    );

    if (user && questValid) {
      addQuestData(user.id);
      setInput("");
      setQuestValid(true);
    }
  };

  useEffect(() => {
    getUserData();
    getQuestData();
    setQuestValid(true);
  }, []);

  useEffect(() => {}, [input]);

  return !isLoading ? (
    <div className="quest-modal-backdrop">
      <div className="quest-modal">
        <div className="quest-input">
          <label style={{ fontWeight: "bolder" }} htmlFor="username">
            Username:
          </label>
          <input
            name="username"
            placeholder="Enter your username"
            value={input}
            onChange={handleChange}
          />
          <div>
            {validation === "Valid User" ? (
              <p style={{ color: "green" }}>Valid User</p>
            ) : validation === "Invalid User" ? (
              <p style={{ color: "red" }}>Invalid User</p>
            ) : (
              <p></p>
            )}
          </div>
        </div>
        {validation === "Valid User" && questValid ? (
          <h5>Add {props.fishtype} to Quest List?</h5>
        ) : validation === "Valid User" && !questValid ? (
          <h5>{props.fishtype} already exist in your Quest List</h5>
        ) : validation === "" ? (
          <h5>Please enter a username</h5>
        ) : (
          <h5>Username does not exist</h5>
        )}
        <div className="questModalBtnContainer">
          <button className="questModalBtn" onClick={() => handleClick()}>
            Add to Quest
          </button>
          <button
            className="questModalBtn"
            onClick={() => props.setShowQuestModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "40%",
        left: "40%",
        zIndex: "100",
      }}
    >
      <LoadingSpinner />
    </div>
  );
};

const QuestModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <QuestOverlay
          fishtype={props.fishtype}
          setShowQuestModal={props.setShowQuestModal}
        />,
        document.querySelector("#questmodal-root")
      )}
    </>
  );
};

export default QuestModal;
