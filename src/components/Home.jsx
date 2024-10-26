import React, { useEffect, useState } from "react";
import UserPokedexCard from "./Community/UserPokedexCard";

const Home = () => {
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState([]);

  const getPostData = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_USERPOSTS + "?maxRecords=100&view=Grid%20view",
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
      setPostData(data.records);
    } catch (error) {
      console.error(error.message);
    }
  };

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
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getPostData();
    getUserData();
  }, []);

  return (
    <div className="userCards">
      {postData.map((post) => {
        return (
          <div key={post.id}>
            <UserPokedexCard
              className="userPokedexCard"
              status={
                userData.find((user) => user.fields.posts?.includes(post.id))
                  ?.fields.anglerstatus
              }
              fishtype={post.fields.fishtype}
              username={
                userData.find((user) => user.fields.posts?.includes(post.id))
                  ?.fields.username
              }
              fightrate={post.fields.fightrate}
              age={
                userData.find((user) => user.fields.posts?.includes(post.id))
                  ?.fields.age
              }
              location={post.fields.location}
              msg={post.fields.msg}
              src={post.fields.img}
              date={post.fields.date}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Home;

{
  /* <div className={props.className}>
<h5 style={props.style}>{props.status}</h5>
<div>
  <img src={props.src} />
</div>
<div>
  <p>Caught:</p>
  <h5>{props.fishtype}</h5>
  <p>
    {props.fightrate} <span>{props.location}</span>
  </p>
  <p>{props.msg}</p>
</div>
<Button func={props.func}>Profile</Button>
<p>
  {props.username}, {props.age}
</p>
</div>
);
}; */
}
