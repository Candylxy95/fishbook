import React from "react";
import styles from "./UserPokedex.module.css";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

const UserPokedexCard = (props) => {
  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUDNAME },
  });
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
            const transformedDPurl = publicId
              ? cld.image(publicId).resize(fill().width(450)).toURL()
              : "/images/fishbook-logo.png";

            return (
              <div key={userpost.id}>
                <div>
                  <img
                    src={transformedDPurl || "/images/fishbook-logo"}
                    className={props.imgClassName}
                  />
                </div>
                <div className={props.className}>
                  <div>
                    <span>
                      Caught:{" "}
                      <div>
                        <p
                          style={{
                            fontSize: "18px",
                            fontWeight: "500",
                          }}
                        >
                          {userpost.fields.fishtype}
                        </p>
                        <div style={{ lineHeight: "5px" }}>
                          {userpost?.fields?.status === "Abundant" ? (
                            <p style={{ color: "#2B9EB3" }}>Abundant</p>
                          ) : userpost?.fields?.status === "Common" ? (
                            <p style={{ color: "#78C247" }}>Common</p>
                          ) : userpost?.fields?.status === "Uncommon" ? (
                            <p style={{ color: "#CFD11A" }}>Uncommon</p>
                          ) : userpost?.fields?.status === "Rare" ? (
                            <p style={{ color: "#D9594C" }}>Rare</p>
                          ) : userpost?.fields?.status === "Rare" ? (
                            <p style={{ color: "#F84AA7" }}>Very Rare</p>
                          ) : userpost?.fields?.status === "Extremely Rare" ? (
                            <p style={{ color: "#753742" }}>Extremely Rare</p>
                          ) : (
                            <p style={{ color: "#553EA3" }}>Mysterious</p>
                          )}
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    paddingLeft: "20px",
                    lineHeight: "5px",
                    fontSize: "14px",
                  }}
                >
                  <p>
                    Fight: <b>{userpost.fields.fightrate}</b>
                  </p>
                  <p>
                    Location: <b>{userpost.fields.location}</b>
                  </p>
                </div>
                <p
                  style={{
                    paddingLeft: "20px",
                    paddingTop: "15px",
                    color: "var(--gwey)",
                  }}
                >
                  {userpost.fields.msg}
                </p>
                <div
                  className={styles.dateAndBtn}
                  style={{
                    paddingRight: "20px",
                    fontSize: "14px",
                    color: "var(--gwey)",
                  }}
                >
                  <p style={{ paddingLeft: "20px" }}>{userpost.fields.date}</p>
                  <p>{userpost.fields.username}</p>
                  {props.setUpdateBtnClicked && (
                    <button
                      style={{ marginBottom: "20px" }}
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
                marginTop: "40vh",
              }}
            >
              <img
                src="/images/fishiconblack.png"
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
