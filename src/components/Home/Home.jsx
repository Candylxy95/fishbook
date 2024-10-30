import React, { useEffect, useState } from "react";
import HomePokeCard from "./HomePokeCard";
import Stats from "../Community/Stats";
import styles from "./Home.module.css";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

const Home = () => {
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState([]);
  const cld = new Cloudinary({ cloud: { cloudName: "dxbp8cza1" } });

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
    <div className={styles.userCard}>
      {postData.map((post) => {
        const getPublicId = (url) => {
          const cleanedUrl = url.split("?")[0];
          const parts = cleanedUrl.split("/upload/");
          if (parts[1]) {
            return parts[1].split(/[/?]/).pop();
          }
        };

        const publicId = getPublicId(post.fields.img);
        console.log(`its this ${post.fields.img}`);
        console.log(publicId);
        const transformedImgUrl = publicId
          ? cld.image(publicId).resize(fill().width(250)).toURL()
          : "./images/fishbook-logo.png";

        return (
          <div key={post.id} className={styles.homeBody}>
            <HomePokeCard
              pokedexCardContainer={styles.pokeCardContainer}
              className={styles.userPokeCard}
              imgClassName={styles.imgClassName}
              status={
                userData.find((user) => user.fields.posts?.includes(post.id))
                  ?.fields.posts?.length > 10 &&
                userData.find((user) => user.fields.posts?.includes(post.id))
                  ?.fields.posts?.length <= 20 ? (
                  <p style={{ color: "#987284" }}>Amateur</p>
                ) : userData.find((user) =>
                    user.fields.posts?.includes(post.id)
                  )?.fields.posts?.length > 20 &&
                  userData.find((user) => user.fields.posts?.includes(post.id))
                    ?.fields.posts?.length <= 50 ? (
                  <p style={{ color: "#C73E1D" }}>Adept</p>
                ) : userData.find((user) =>
                    user.fields.posts?.includes(post.id)
                  )?.fields.posts?.length > 50 &&
                  userData.find((user) => user.fields.posts?.includes(post.id))
                    ?.fields.posts?.length <= 100 ? (
                  <p style={{ color: "#C44900" }}>Master</p>
                ) : userData.find((user) =>
                    user.fields.posts?.includes(post.id)
                  )?.fields.posts?.length > 100 ? (
                  <p style={{ color: "#345830" }}>Legendary</p>
                ) : (
                  <p style={{ color: "#A0CED9" }}>Beginner</p>
                )
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
              fishstatus={
                post.fields.status === "Abundant" ? (
                  <p style={{ color: "#A0CED9" }}>Abundant</p>
                ) : post.fields.status === "Rare" ? (
                  <p style={{ color: "pink" }}>Rare</p>
                ) : post.fields.status === "Common" ? (
                  <p style={{ color: "pink" }}>Common</p>
                ) : post.fields.status === "Extremely Rare" ? (
                  <p style={{ color: "pink" }}>Extremely Rare</p>
                ) : post.fields.status === "Rare" ? (
                  <p style={{ color: "pink" }}>Rare</p>
                ) : (
                  "none"
                )
              }
              location={post.fields.location}
              msg={post.fields.msg}
              img={transformedImgUrl}
              date={post.fields.date}
              statsDivWrapper={styles.statsDivWrapper}
              homeStats={styles.homeStats}
              fishcount={
                userData.find((user) => user.fields.posts?.includes(post.id))
                  ?.fields.posts.length || 0
              }
              questcount={
                userData.find((user) => user.fields.posts?.includes(post.id))
                  ?.fields.questlist?.length || 0
              }
              width="16px"
              height="16px"
              fontSize="16px"
            />
            {/* <Stats
              statsDivWrapper={styles.statsDivWrapper}
              className={styles.homeStats}
              fishcount={
                userData.find((user) => user.fields.posts?.includes(post.id))
                  ?.fields.posts.length || 0
              }
              questcount={
                userData.find((user) => user.fields.posts?.includes(post.id))
                  ?.fields.questlist?.length || 0
              }
              width="20px"
              height="20px"
            /> */}
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
