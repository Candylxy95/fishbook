import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import UserCard from "./UserCard";
import UserPokedexCard from "./UserPokedexCard";
import Stats from "./Stats";
import QuestList from "./QuestList";
import styles from "./UserPokedex.module.css";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import TypographyHeader from "../TypographyHeader";
import LoadingSpinner from "../LoadingSpinner";

const UserPokedex = () => {
  const navigate = useNavigate();
  const [userAcc, setUserAcc] = useState([]);
  const [postData, setPostData] = useState([]);
  const [questData, setQuestData] = useState([]);
  const [updateBtnClicked, setUpdateBtnClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUDNAME },
  });

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
      const latestPostData = data.records.sort(
        (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
      );
      setPostData(latestPostData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const delPostData = async (postId) => {
    try {
      const res = await fetch(import.meta.env.VITE_USERPOSTS + "/" + postId, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_USERAPI_KEY}`,
        },
      });
      if (!res.ok) {
        throw new Error("getting data error");
      }
      getPostData();
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

  const delQuestData = async (questId) => {
    try {
      const res = await fetch(import.meta.env.VITE_USERQUESTS + "/" + questId, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_USERAPI_KEY}`,
        },
      });
      if (!res.ok) {
        throw new Error("getting data error");
      }
      getQuestData();
      getUserData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateUserData = async (bioMsg) => {
    try {
      const res = await fetch(import.meta.env.VITE_USERSERVER + "/" + id, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_USERAPI_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            msg: bioMsg,
          },
        }),
      });
      if (!res.ok) {
        throw new Error("getting data error");
      }
      getUserData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUpdateBtn = () => {
    if (!updateBtnClicked) {
      setUpdateBtnClicked(true);
    } else setUpdateBtnClicked(false);
  };

  const handleCompleteClick = (fishType) => {
    navigate("/createpost", { state: { defaultValue: fishType } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([getPostData(), getUserData(), getQuestData()]);
      } catch (error) {
        console.error("Error", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return !isLoading ? (
    userAcc.map((user) => {
      const userPost = postData?.filter((post) =>
        post.fields["Table 1"]?.includes(user.id)
      );

      const userQuests = questData?.filter(
        (quest) => quest.fields["Table 1"]?.includes(user.id) //return all keyvaluepairs that includes user id in an array.
      );

      const getPublicId = (url) => {
        const cleanedUrl = url.split("?")[0];
        const parts = cleanedUrl.split("/upload/");
        if (parts[1]) {
          return parts[1].split(/[/?]/).pop();
        }
      };

      const publicId = getPublicId(user.fields.img);
      const transformedDPurl = publicId
        ? cld
            .image(publicId)
            .resize(fill().width(200).height(200).gravity("face"))
            .toURL()
        : "./images/fishbook-logo.png";

      return (
        <>
          <div className={styles.userProfileCards} key={user.id}>
            <div className={styles.headerDiv}>
              <TypographyHeader
                headerMsg={`${user.fields.username.toUpperCase()}'s FishDex`}
                fontstyle={{
                  fontFamily: "var(--staac)",
                  fontSize: "35px",
                  fontWeight: "500",
                }}
                repeat={0}
              />
              <button className={styles.updateBtn} onClick={handleUpdateBtn}>
                Update
              </button>
            </div>
            <div className={styles.fishDexBody}>
              <div>
                <UserCard
                  className={styles.userProfileCard}
                  userCardImg={styles.userCardImg}
                  userStatus={
                    user.fields.posts?.length > 10 &&
                    user.fields.posts?.length <= 20 ? (
                      <p style={{ color: "#987284" }}>Amateur</p>
                    ) : user.fields.posts?.length > 20 &&
                      user.fields.posts?.length <= 50 ? (
                      <p style={{ color: "#C73E1D" }}>Adept</p>
                    ) : user.fields.posts?.length > 50 &&
                      user.fields.posts?.length <= 100 ? (
                      <p style={{ color: "#C44900" }}>Master</p>
                    ) : user.fields.posts?.length > 100 ? (
                      <p style={{ color: "#345830" }}>Legendary</p>
                    ) : (
                      <p style={{ color: "#A0CED9" }}>Beginner</p>
                    )
                  }
                  userStatusClass={styles.userStatusClass}
                  src={transformedDPurl}
                  actualImg={styles.actualImg}
                  userName={user.fields.username}
                  age={user.fields.age}
                  location={user.fields.country}
                  msg={user.fields.msg}
                  setUpdateBtnClicked={updateBtnClicked}
                  handleBioUpdate={updateUserData}
                />
              </div>
              <div>
                {userPost && (
                  <UserPokedexCard
                    userPostArray={userPost}
                    pokedexCardContainer={styles.pokedexCardContainer}
                    className={styles.userPokedexCard}
                    imgClassName={styles.imgClassName}
                    setUpdateBtnClicked={updateBtnClicked}
                    delPostData={delPostData}
                  />
                )}
              </div>
            </div>
            <Stats
              className="stats"
              fishcount={user.fields.posts ? user.fields.posts.length : 0}
              questcount={
                user.fields.questlist ? user.fields.questlist?.length : 0
              }
            />

            <QuestList
              questArray={userQuests}
              deleteFunc={delQuestData}
              completeFunc={handleCompleteClick}
            />
          </div>
        </>
      );
    })
  ) : (
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
  );
};

export default UserPokedex;
