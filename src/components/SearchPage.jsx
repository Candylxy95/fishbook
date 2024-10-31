import React, { useState, useEffect } from "react";
import UserCard from "./Community/UserCard";
import styles from "./SearchPage.module.css";
import { useLocation } from "react-router-dom";
import HomePokeCard from "./Home/HomePokeCard";
import FishCard from "./FishFinder/FishCard";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const defaultValue = location.state?.defaultValue;
  const [fishesData, setFishesData] = useState([]);
  const [displayFishCards, setDisplayFishCards] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [displayPostCards, setDisplayPostsCards] = useState([]);
  const [userData, setUserData] = useState([]);
  const [displayUserCards, setDisplayUserCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fishSearchOnMount = () => {
    const inputKeyword = (defaultValue || "").toLowerCase();
    if (!inputKeyword) {
      setDisplayFishCards([]);
      return;
    }
    const matchingKeyword = fishesData.filter((fishData) =>
      fishData?.name?.toLowerCase().includes(inputKeyword)
    );
    setDisplayFishCards(matchingKeyword);
  };

  const getFishesData = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/fishes", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "fish-species.p.rapidapi.com",
          "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
        },
      });

      if (!res.ok) {
        throw new Error("no fishy data for you");
      }
      const data = await res.json();
      setFishesData(data);
      fishSearchOnMount();
    } catch (error) {
      console.error(error.message);
    }
  };

  const userSearchOnMount = () => {
    const inputKeyword = (defaultValue || "").toLowerCase();
    if (!inputKeyword) {
      setDisplayUserCards([]);
      return;
    }
    const matchingKeyword = userData.filter(
      (user) =>
        user?.fields.username?.toLowerCase().includes(inputKeyword) ||
        user?.fields.country?.toLowerCase().includes(inputKeyword) ||
        user?.fields.msg?.toLowerCase().includes(inputKeyword)
    );
    setDisplayUserCards(matchingKeyword);
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
      userSearchOnMount();
    } catch (error) {
      console.error(error.message);
    }
  };

  const postSearchOnMount = () => {
    const inputKeyword = (defaultValue || "").toLowerCase();
    if (!inputKeyword) {
      setDisplayPostsCards([]);
      return;
    }
    const matchingKeyword = postsData.filter(
      (post) =>
        post?.fields.fishtype?.toLowerCase().includes(inputKeyword) ||
        post?.fields.location?.toLowerCase().includes(inputKeyword) ||
        post?.fields.msg?.toLowerCase().includes(inputKeyword)
    );
    setDisplayPostsCards(matchingKeyword);
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
      setPostsData(data.records);
      postSearchOnMount();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleClick = (userId) => {
    navigate(`/UserPokedex/${userId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([getPostData(), getUserData(), getFishesData()]);
      } catch (error) {
        console.log(error)("Error", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    postSearchOnMount();
    userSearchOnMount();
    fishSearchOnMount();
    console.log(defaultValue);
  }, [defaultValue, userData, postsData, fishesData]);

  return !isLoading ? (
    <div className={styles.searchPage}>
      {displayPostCards.length > 0 && (
        <div className={styles.postRow}>
          <div
            style={{
              width: "100%",
              color: "var(--gwey)",
              textAlign: "center",
            }}
          >
            {displayPostCards.length} user {"post(s)"} found.
          </div>
          {displayPostCards.map((post) => {
            return (
              <HomePokeCard
                func={() => handleClick(post.fields["Table 1"])}
                key={post.id}
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
                img={post.fields.img}
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
            );
          })}{" "}
        </div>
      )}

      {displayUserCards.length > 0 && (
        <div className={styles.userRow}>
          <div
            style={{
              width: "100%",
              color: "var(--gwey)",
              textAlign: "center",
            }}
          >
            {displayUserCards.length} {"user(s)"} found.
          </div>
          {displayUserCards.map((userInput) => {
            return (
              <div className={styles.userCardContainer}>
                <UserCard
                  key={userInput.id}
                  func={() => handleClick(userInput.id)}
                  userCardImg={styles.userCardImg}
                  className={styles.userCard}
                  userStatus={
                    userInput.fields.posts?.length > 10 &&
                    userInput.fields.posts?.length <= 20 ? (
                      <p style={{ color: "#987284" }}>Amateur</p>
                    ) : userInput.fields.posts?.length > 20 &&
                      userInput.fields.posts?.length <= 50 ? (
                      <p style={{ color: "#C73E1D" }}>Adept</p>
                    ) : userInput.fields.posts?.length > 50 &&
                      userInput.fields.posts?.length <= 100 ? (
                      <p style={{ color: "#C44900" }}>Master</p>
                    ) : userInput.fields.posts?.length > 100 ? (
                      <p style={{ color: "#345830" }}>Legendary</p>
                    ) : (
                      <p style={{ color: "#A0CED9" }}>Beginner</p>
                    )
                  }
                  src={userInput.fields.img}
                  actualImg={styles.actualImg}
                  userName={userInput.fields.username}
                  age={userInput.fields.age}
                  location={userInput.fields.country}
                  msg={userInput.fields.msg}
                  userStatusClass={styles.userStatusClass}
                  userlocationDiv={styles.userlocationDiv}
                  msgstyle={styles.msgstyle}
                  fishcount={
                    userInput.fields.posts ? userInput.fields.posts.length : 0
                  }
                  questcount={
                    userInput.fields.questlist
                      ? userInput.fields.questlist?.length
                      : 0
                  }
                  width="16px"
                  height="16px"
                  questimg="../images/quest.png"
                  trophyimg="../images/trophy.png"
                  statsClass={styles.statsClass}
                  statsClassChild={styles.statsClassChild}
                />
              </div>
            );
          })}
        </div>
      )}
      {displayFishCards.length > 0 && (
        <div className={styles.fishRow}>
          <div
            style={{
              width: "100%",
              color: "var(--gwey)",
              textAlign: "center",
            }}
          >
            {displayFishCards.length} {"fish(es)"} found.
          </div>
          {displayFishCards.map((displayFishCard) => {
            return (
              <div className={styles.fishCardContainer}>
                <FishCard
                  key={displayFishCard.id}
                  className={styles.fishCard}
                  imgClass={styles.fishImgClass}
                  src={
                    displayFishCard?.img_src_set["1.5x"] ||
                    "./images/fishimgplaceholder.png"
                  }
                  fishCardBtns={styles.fishCardBtns}
                  fishName={displayFishCard?.name}
                  rarity={
                    displayFishCard?.meta.conservation_status?.includes(
                      "Least Concern"
                    ) ? (
                      <span
                        style={{
                          color: "#2B9EB3",
                          fontSize: "20px",
                        }}
                      >
                        Abundant
                      </span>
                    ) : displayFishCard?.meta.conservation_status?.includes(
                        "secure"
                      ) ? (
                      <span
                        style={{
                          color: "#78C247",
                          fontSize: "20px",
                        }}
                      >
                        Common
                      </span>
                    ) : displayFishCard?.meta.conservation_status?.includes(
                        "Near Threatened"
                      ) ? (
                      <span
                        style={{
                          color: "#CFD11A",
                          fontSize: "20px",
                        }}
                      >
                        Uncommon
                      </span>
                    ) : displayFishCard?.meta.conservation_status?.includes(
                        "Vulnerable"
                      ) ? (
                      <span
                        style={{
                          color: "#D9594C",
                          fontSize: "20px",
                        }}
                      >
                        Rare
                      </span>
                    ) : displayFishCard?.meta.conservation_status?.includes(
                        "Endangered"
                      ) ? (
                      <span
                        style={{
                          color: "#F84AA7",
                          fontSize: "20px",
                        }}
                      >
                        Very Rare
                      </span>
                    ) : displayFishCard?.meta.conservation_status?.includes(
                        "Critically Endangered"
                      ) ? (
                      <span
                        style={{
                          color: "#FFC60A",
                          fontSize: "20px",
                        }}
                      >
                        Extremely Rare
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "#753742",
                          fontSize: "20px",
                        }}
                      >
                        Mysterious
                      </span>
                    )
                  }
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        height: "80vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoadingSpinner />
    </div>
  );
};

export default SearchPage;
