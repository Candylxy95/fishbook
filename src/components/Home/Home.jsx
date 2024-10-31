import React, { useEffect, useState } from "react";
import HomePokeCard from "./HomePokeCard";
import styles from "./Home.module.css";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import LoadingSpinner from "../LoadingSpinner";
import TypographyHeader from "../TypographyHeader";

const Home = () => {
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
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

  return isLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <LoadingSpinner />
    </div>
  ) : (
    <>
      <div className={styles.typographyHeader}>
        <TypographyHeader
          speed={30}
          headerMsg={[
            "Fishbook.",
            1000,
            "A page for every Angler.",
            1000,
            "Fishbook.",
          ]}
          fontstyle={{
            color: "var(--white)",
            fontSize: "40px",
            fontFamily: "var(--stac)",
            fontWeight: "600",
          }}
          repeat={0}
        />
      </div>
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
            <>
              <div key={post.id} className={styles.homeBody}>
                <HomePokeCard
                  pokedexCardContainer={styles.pokeCardContainer}
                  className={styles.userPokeCard}
                  imgClassName={styles.imgClassName}
                  status={
                    userData.find((user) =>
                      user.fields.posts?.includes(post.id)
                    )?.fields.posts?.length > 10 &&
                    userData.find((user) =>
                      user.fields.posts?.includes(post.id)
                    )?.fields.posts?.length <= 20 ? (
                      <p style={{ color: "#987284" }}>Amateur</p>
                    ) : userData.find((user) =>
                        user.fields.posts?.includes(post.id)
                      )?.fields.posts?.length > 20 &&
                      userData.find((user) =>
                        user.fields.posts?.includes(post.id)
                      )?.fields.posts?.length <= 50 ? (
                      <p style={{ color: "#C73E1D" }}>Adept</p>
                    ) : userData.find((user) =>
                        user.fields.posts?.includes(post.id)
                      )?.fields.posts?.length > 50 &&
                      userData.find((user) =>
                        user.fields.posts?.includes(post.id)
                      )?.fields.posts?.length <= 100 ? (
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
                    userData.find((user) =>
                      user.fields.posts?.includes(post.id)
                    )?.fields.username
                  }
                  fightrate={post.fields.fightrate}
                  age={
                    userData.find((user) =>
                      user.fields.posts?.includes(post.id)
                    )?.fields.age
                  }
                  fishstatus={
                    post.fields.status === "Abundant" ? (
                      <p style={{ color: "#2B9EB3" }}>Abundant</p>
                    ) : post.fields.status === "Common" ? (
                      <p style={{ color: "#78C247" }}>Common</p>
                    ) : post.fields.status === "Uncommon" ? (
                      <p style={{ color: "#CFD11A" }}>Uncommon</p>
                    ) : post.fields.status === "Rare" ? (
                      <p style={{ color: "#D9594C" }}>Rare</p>
                    ) : post.fields.status === "Rare" ? (
                      <p style={{ color: "#F84AA7" }}>Very Rare</p>
                    ) : post.fields.status === "Extremely Rare" ? (
                      <p style={{ color: "#753742" }}>Extremely Rare</p>
                    ) : (
                      <p style={{ color: "#553EA3" }}>Mysterious</p>
                    )
                  }
                  location={post.fields.location}
                  msg={post.fields.msg}
                  img={transformedImgUrl}
                  date={post.fields.date}
                  statsDivWrapper={styles.statsDivWrapper}
                  homeStats={styles.homeStats}
                  fishcount={
                    userData.find((user) =>
                      user.fields.posts?.includes(post.id)
                    )?.fields.posts.length || 0
                  }
                  questcount={
                    userData.find((user) =>
                      user.fields.posts?.includes(post.id)
                    )?.fields.questlist?.length || 0
                  }
                  width="16px"
                  height="16px"
                  fontSize="16px"
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Home;
