import React, { useEffect, useState } from "react";
import UserPokedexCard from "./Community/UserPokedexCard";
import Stats from "./Community/Stats";

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
                  ?.fields.posts?.length > 10 &&
                userData.find((user) => user.fields.posts?.includes(post.id))
                  ?.fields.posts?.length <= 20
                  ? "Amateur"
                  : userData.find((user) =>
                      user.fields.posts?.includes(post.id)
                    )?.fields.posts?.length > 20 &&
                    userData.find((user) =>
                      user.fields.posts?.includes(post.id)
                    )?.fields.posts?.length <= 50
                  ? "Adept"
                  : userData.find((user) =>
                      user.fields.posts?.includes(post.id)
                    )?.fields.posts?.length > 50 &&
                    userData.find((user) =>
                      user.fields.posts?.includes(post.id)
                    )?.fields.posts?.length <= 100
                  ? "Master"
                  : userData.find((user) =>
                      user.fields.posts?.includes(post.id)
                    )?.fields.posts?.length > 100
                  ? "Master"
                  : "Beginner"
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
              fishstatus={post.fields.status}
              location={post.fields.location}
              msg={post.fields.msg}
              src={post.fields.img}
              date={post.fields.date}
            />
            <Stats
              className="AnglerComStats"
              fishcount={
                userData.find((user) => user.fields.posts?.includes(post.id))
                  ?.fields.posts.length
              }
              questcount={
                userData.find((user) => user.fields.posts?.includes(post.id))
                  ?.fields.questlist?.length || 0
              }
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
