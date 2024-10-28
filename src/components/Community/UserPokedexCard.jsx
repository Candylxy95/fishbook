import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { face } from "@cloudinary/url-gen/qualifiers/focusOn";

const UserPokedexCard = (props) => {
  const cld = new Cloudinary({ cloud: { cloudName: "dxbp8cza1" } });

  return (
    <>
      <div className={props.pokedexCardContainer}>
        {props.userPostArray?.length > 0 ? (
          props.userPostArray?.map((userpost, idx) => {
            // const transformedPostImage = userpost.fields.img
            //   ? cld.image(userpost.fields.img).resize(fill().width(550)).toURL()
            //   : "./images/fishbook-logo.png";

            return (
              <div key={idx}>
                {/* <h5 style={props.style}>{props.status}</h5> */}
                <div>
                  <img
                    src={userpost.fields.img || "../images/fishbook-logo"}
                    // src={transformedPostImage || "../images/fishbook-logo"}
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
                          {userpost?.fields?.fishstatus}
                        </p>
                      </h5>
                    </span>
                  </div>
                </div>
                <div>
                  <p>Fight: {userpost.fields.fightrate}</p>
                  <p>Location: {userpost.fields.location}</p>
                </div>
                <p>{userpost.fields.msg}</p>
                <div>
                  <p>{userpost.fields.date}</p>
                  <p>{userpost.fields.username}</p>
                </div>
              </div>
            );
          })
        ) : (
          <h5 style={{ alignSelf: "center", marginTop: "80%" }}>
            No posts to show
          </h5>
        )}
      </div>
    </>
  );
};

export default UserPokedexCard;
