import React, { useEffect, useState } from "react";

const UserProfiles = () => {
  const [userInputs, setUserInputs] = useState([]);

  const getUserData = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_USERSERVER + "?maxRecords=3&view=Grid%20view",
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

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      {userInputs.map((userInput, idx) => {
        return <h1 key={idx}>{userInput.fields.username}</h1>;
      })}
    </div>
  );
};

export default UserProfiles;
