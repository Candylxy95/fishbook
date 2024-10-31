import React from "react";
import styles from "./UserPokedex.module.css";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

const UserPokedexCard = (props) => {
  const cld = new Cloudinary({ cloud: { cloudName: "dxbp8cza1" } });
  return (
    <>
      <div className={props.pokedexCardContainer}>
        {props.userPostArray?.length > 0 ? (
          props.userPostArray?.map((userpost) => {
            const getPublicId = (url) => {
              const cleanedUrl = url.split("?")[0];
              const parts = cleanedUrl.split("/upload/");
              if (parts[1]) {
                return parts[1].split(/[/?]/).pop();
              }
            };

            const publicId = getPublicId(userpost.fields.img);
            console.log(`its this ${userpost.fields.img}`);
            console.log(publicId);
            const transformedDPurl = publicId
              ? cld.image(publicId).resize(fill().width(450)).toURL()
              : "./images/fishbook-logo.png";

            return (
              <div key={userpost.id}>
                <div>
                  <img
                    src={transformedDPurl || "../images/fishbook-logo"}
                    className={props.imgClassName}
                  />
                </div>
                <div className={props.className}>
                  <div>
                    <span>
                      Caught:{" "}
                      <h5>
                        {userpost.fields.fishtype}{" "}
                        <p style={{ fontSize: "16px" }}>
                          {userpost?.fields?.status}
                        </p>
                      </h5>
                    </span>
                  </div>
                </div>
                <div style={{ paddingLeft: "10px" }}>
                  <p>Fight: {userpost.fields.fightrate}</p>
                  <p>Location: {userpost.fields.location}</p>
                </div>
                <p style={{ paddingLeft: "10px" }}>{userpost.fields.msg}</p>
                <div
                  className={styles.dateAndBtn}
                  style={{ paddingRight: "10px" }}
                >
                  <p style={{ paddingLeft: "10px" }}>{userpost.fields.date}</p>
                  <p>{userpost.fields.username}</p>
                  {props.setUpdateBtnClicked && (
                    <button
                      className={styles.updateBtn}
                      onClick={() => props.delPostData(userpost.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                border: "solid 5px #252525",
                padding: "20px 10px",
                borderRadius: "100%",
              }}
            >
              <img
                src="../images/fishiconblack.png"
                style={{ width: "100px", height: "auto" }}
              />
            </div>
            <p>This user has no posts yet</p>
          </div>
        )}
      </div>
    </>
  );
};

export default UserPokedexCard;
