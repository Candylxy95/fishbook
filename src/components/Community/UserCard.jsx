import React from "react";
import styles from "./UserPokedex.module.css";
import { useState } from "react";

const UserCard = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editBtnMsg, setEditBtnMsg] = useState("Edit");
  const [newBio, setNewBio] = useState("");

  const handleBioEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
      setEditBtnMsg("Submit");
      setNewBio(props.msg);
    } else {
      props.handleBioUpdate(newBio);
      setEditBtnMsg("Edit");
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    setNewBio(e.target.value);
  };

  return (
    <div className={props.className} onClick={props.func}>
      <div>
        <p>{props.status}</p>
      </div>
      <div className={props.userCardImg}>
        <img src={props.src} className={props.actualImg} />
      </div>
      <div className={props.statsClass}>
        <p className={props.userStatusClass}>{props.userStatus}</p>
        <div className={props.statsClassChild}>
          <img
            src={props.trophyimg}
            style={{ width: props.width, height: props.height }}
          />
          <p style={{ fontSize: props.fontSize }}>{props.fishcount}</p>

          <img
            src={props.questimg}
            style={{ width: props.width, height: props.height }}
          />
          <p style={{ fontSize: props.fontSize }}>{props.questcount}</p>
        </div>
      </div>
      <div>
        <div className={props.userlocationDiv}>
          <h5>
            {props.userName}, {props.age}
          </h5>
          <p>{props.location}</p>
        </div>
        <div className={styles.msgStyle}>
          {!isEditing ? (
            <p>{props.msg}</p>
          ) : (
            <textarea
              style={{
                width: "100%",
                height: "150px",
                display: "flex",
                textAlign: "left",
                verticalAlign: "top",
              }}
              value={newBio}
              onChange={handleChange}
            ></textarea>
          )}
        </div>
        {props.setUpdateBtnClicked && (
          <button
            className={styles.updateBtn}
            style={{ marginTop: "15px" }}
            onClick={handleBioEdit}
          >
            {editBtnMsg}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
