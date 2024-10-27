import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";
import Stats from "./Stats";

const UserProfiles = () => {
  const navigate = useNavigate();
  const [userInputs, setUserInputs] = useState([]);

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
      setUserInputs(data.records);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleClick = (userId) => {
    navigate(`/UserPokedex/${userId}`);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="profileHeader">
        <h1>Connect with passionate Anglers today</h1>
      </div>
      <div className="userCards">
        {userInputs.map((userInput, idx) => {
          return (
            <div key={idx}>
              <UserCard
                func={() => handleClick(userInput.id)}
                className="userCard"
                status={userInput.fields.anglerstatus}
                src={userInput.fields.img}
                userName={userInput.fields.username}
                age={userInput.fields.age}
                location={userInput.fields.country}
                msg={userInput.fields.msg}
              />
              <Stats
                className="AnglerComStats"
                fishcount={
                  userInput.fields.posts ? userInput.fields.posts.length : 0
                }
                questcount={userInput.fields.questcount}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserProfiles;

// return (
//   <div className={props.className}>
//     <img src="../images/trophy.png" />
//     <h5>{props.fishcount}</h5>
//     <img src="../images/quest.png" />
//     <h5>{props.questcount}</h5>
//   </div>
// );
