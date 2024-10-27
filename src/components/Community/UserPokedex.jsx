import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import UserPokedexCard from "./UserPokedexCard";
import { useParams } from "react-router-dom";
import Stats from "./Stats";
import QuestList from "./QuestList";

const UserPokedex = () => {
  const [userAcc, setUserAcc] = useState([]);
  const [postData, setPostData] = useState([]);
  const [questData, setQuestData] = useState([]);
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
      setQuestData(data.records);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserData();
    getPostData();
    getQuestData();
  }, []);

  return userAcc.map((user, idx) => {
    const userPost = postData.find((post) =>
      post.fields["Table 1"]?.includes(user.id)
    );

    const userQuests = questData.find((quest) =>
      quest.fields["Table 1"]?.includes(user.id)
    );

    return (
      <>
        <div className="userProfileCards" key={idx}>
          <h1>{user.fields.username}'s FishDex</h1>
          <UserCard
            className="userProfileCard"
            status={
              user.fields.posts?.length > 10 && user.fields.posts?.length <= 20
                ? "Amateur"
                : user.fields.posts?.length > 20 &&
                  user.fields.posts?.length <= 50
                ? "Adept"
                : user.fields.posts?.length > 50 &&
                  user.fields.posts?.length <= 100
                ? "Master"
                : user.fields.posts?.length > 100
                ? "Master"
                : "Beginner"
            }
            src={user.fields.img}
            userName={user.fields.username}
            age={user.fields.age}
            location={user.fields.country}
            msg={user.fields.msg}
          />
          <Stats
            className="stats"
            fishcount={user.fields.posts ? user.fields.posts.length : 0}
            questcount={
              user.fields.questlist ? user.fields.questlist?.length : 0
            }
          />
          <QuestList
            className="stats"
            fishtype={userQuests?.fields.fishquest}
          />
          {userPost && (
            <UserPokedexCard
              className="userPokedexCard"
              src={userPost.fields.img}
              fishtype={userPost.fields.fishtype}
              fightrate={userPost.fields.fightrate}
              location={userPost.fields.location}
              msg={userPost.fields.msg}
              date={userPost.fields.date}
              fishstatus={userPost.fields.status}
            />
          )}
        </div>
      </>
    );
  });
};

export default UserPokedex;

// status={
//     userData.find((user) => user.fields.posts?.includes(post.id))
//       ?.fields.anglerstatus
//   }

// return (
//     <div className={props.className}>
//       <h5 style={props.style}>{props.status}</h5>
//       <div>
//         <img src={props.src} />
//       </div>
//       <div>
//         <span>
//           Caught: <h5>{props.fishtype}</h5>
//         </span>
//       </div>
//       <div>
//         <p>Fight: {props.fightrate}</p>
//         <p>Location: {props.location}</p>
//       </div>
//       <p>{props.msg}</p>
//       <div>
//         <p>{props.date}</p>
//         <p>{props.username}</p>
//       </div>
//     </div>
//   );
