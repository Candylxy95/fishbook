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

const UserPokedex = () => {
  const navigate = useNavigate();
  const [userAcc, setUserAcc] = useState([]);
  const [postData, setPostData] = useState([]);
  const [questData, setQuestData] = useState([]);
  const [updateBtnClicked, setUpdateBtnClicked] = useState(false);
  const { id } = useParams();
  const cld = new Cloudinary({ cloud: { cloudName: "dxbp8cza1" } });

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
      console.log(`quest data = ${questData}`);
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
    getUserData();
    getPostData();
    getQuestData();
  }, []);

  return userAcc.map((user, idx) => {
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
    console.log(`its this ${user.fields.img}`);
    console.log(publicId);
    const transformedDPurl = publicId
      ? cld
          .image(publicId)
          .resize(fill().width(200).height(200).gravity("face"))
          .toURL()
      : "./images/fishbook-logo.png";

    console.log(transformedDPurl);

    return (
      <>
        <div className={styles.userProfileCards} key={idx}>
          <div className={styles.headerDiv}>
            <TypographyHeader
              headerMsg={`${user.fields.username}'s FishDex`}
              fontstyle={{
                fontFamily: "var(--staac)",
                letterSpacing: "2px",
                fontSize: "40px",
                fontWeight: "500",
              }}
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
                  user.fields.posts?.length <= 20
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
  });
};

export default UserPokedex;
