import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

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
            <>
              <UserCard
                key={idx}
                className="userCard"
                status="Master Angler"
                src={userInput.fields.img}
                userName={userInput.fields.username}
                age={userInput.fields.age}
                location={userInput.fields.country}
                msg={userInput.fields.msg}
                func={() => handleClick(userInput.id)}
              />
            </>
          );
        })}
      </div>
    </>
  );
};

export default UserProfiles;

{
  /* <div>
<button
  className={props.className}
  style={props.style}
  onClick={props.func}
>
  {props.children}
</button>
</div>
);
}; */
}
