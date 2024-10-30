import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";
import Stats from "./Stats";
import styles from "./UserProfiles.module.css";
import TypographyHeader from "../TypographyHeader";

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
      <div className={styles.profileHeader}>
        <TypographyHeader
          headerMsg="Connect with passionate Anglers today"
          fontstyle={{
            fontFamily: "Helvetica Neue",
            fontSize: "40px",
            fontWeight: "500",
            lineHeight: "40px",
          }}
          speed={30}
        />
      </div>
      <div className={styles.userCards}>
        {userInputs.map((userInput) => {
          return (
            <div className="groupCard" key={userInput.id}>
              <UserCard
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
    </>
  );
};

export default UserProfiles;
