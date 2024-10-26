import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import UserPokedexCard from "./UserPokedexCard";
import { useParams } from "react-router-dom";

const UserPokedex = () => {
  const [userAcc, setUserAcc] = useState([]);
  const { id } = useParams();

  const getUserData = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_USERSERVER + "/" + id, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_USERAPI_KEY}`,
        },
      });
      if (!res.ok) {
        throw new Error("getting data error");
      }
      const data = await res.json();
      setUserAcc([data]);
    } catch (error) {
      console.error(error.message);
    }
  };

  console.log(userAcc);

  useEffect(() => {
    getUserData();
  }, []);

  return userAcc.map((user, idx) => {
    return (
      <div key={idx}>
        <UserCard
          className="userCard"
          status={user.fields.anglerstatus}
          src={user.fields.src}
          userName={user.fields.userName}
          age={user.fields.age}
          location={user.fields.country}
          msg={user.fields.msg}
        />
        <UserPokedexCard className="userPokedexCard" />
      </div>
    );
  });
};

export default UserPokedex;

{
  /* <div className={props.className}>
<h5 style={props.style}>{props.status}</h5>
<div>
  <img src={props.src} />
</div>
<div>
  <h5>
    {props.userName}, {props.age}
  </h5>
  <p>{props.location}</p>
  <p>{props.msg}</p>
</div>
<Button func={props.func}>Check Out</Button>
</div> */
}

{
  /* <div className={props.className}>
<h5 style={props.style}>{props.status}</h5>
<div>
  <img src={props.src} />
</div>
<div>
  <p>{props.location}</p>
  <p>{props.msg}</p>
</div>
<Button func={props.func}>Check Out</Button>
</div> */
}
