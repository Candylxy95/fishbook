import React, { useState } from "react";
import Button from "./Button";

const CreatePost = () => {
  const [newPosts, setNewPosts] = useState([]);

  return (
    <div className="createPostDisplay">
      <h1 style={{ width: "350px", textAlign: "center" }}>
        Share your awesome catch
      </h1>
      <div className="createPostForm">
        <div className="createPostInput">
          <label>Upload your catch: </label>
          <input name="img" type="image" />
        </div>
        <div className="createPostInput">
          <label>User: </label>
          <input
            name="username"
            type="text"
            placeholder="Enter your username"
          />
        </div>
        <div className="createPostInput">
          <label>Species: </label>
          <select name="fishName" type="text" placeholder="Select a Fish">
            <option value="fishnamefromdata">Fishy1</option>
            <option value="fishnamefromdata">Fishy1</option>
            <option value="fishnamefromdata">Fishy1</option>
            <option value="fishnamefromdata">Sadishy1</option>
          </select>
        </div>
        <div className="createPostInput">
          <label>Location: </label>
          <input name="location" type="text" placeholder="Enter location" />
        </div>
        <div className="createPostInput">
          <label>Date: </label>
          <input name="date" type="date" placeholder="DD/MM/YY" />
        </div>
        <div className="createPostInput">
          <label>Rate Fight: </label>
          <div className="fightRateBtn">
            <input name="fightrate" type="button" value="1" />
            <input name="fightrate" type="button" value="2" />
            <input name="fightrate" type="button" value="3" />
            <input name="fightrate" type="button" value="4" />
            <input name="fightrate" type="button" value="5" />
          </div>
        </div>
        <div className="createPostInput">
          <textarea
            name="msg"
            type="text"
            placeholder="Share something about your catch"
          />
        </div>
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default CreatePost;
