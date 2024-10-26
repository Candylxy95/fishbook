import React, { useEffect, useState } from "react";
import UserPokedexCard from "./Community/UserPokedexCard";

const Home = () => {
  const [postData, setPostData] = useState([]);

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

  useEffect(() => {
    getPostData();
  });

  return (
    <div className="userCards">
      {postData.map((post) => {
        return (
          <div key={post.id}>
            <UserPokedexCard
              className="userCard"
              location={post.fields.location}
              msg={post.fields.msg}
              src={post.fields.img}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Home;

// const UserPokedexCard = (props) => {
//     return (
//       <div className={props.className}>
//         <h5 style={props.style}>{props.status}</h5>
//         <div>
//           <img src={props.src} />
//         </div>
//         <div>
//           <p>{props.location}</p>
//           <p>{props.msg}</p>
//         </div>
//         <Button func={props.func}>Check out</Button>
//       </div>
//     );
//   };
