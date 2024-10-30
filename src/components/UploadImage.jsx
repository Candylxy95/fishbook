import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

const UploadImage = (props) => {
  const cld = new Cloudinary({
    cloud: { cloudName: "dxbp8cza1" },
  });
  const [photoImage, setPhotoImage] = useState("");

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "czgtuilq");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/" +
          import.meta.env.VITE_CLOUDNAME +
          "/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.secure_url) {
        setPhotoImage(data.public_id);

        const transformedImg = cld
          .image(data.public_id)
          .resize(fill().width(250));
        const transformedUrl = transformedImg.toURL();

        props.func(transformedUrl);
      } else {
        console.error("Upload failed:", data);
        alert("Uploading image failed. Please try again");
      }
    } catch (error) {
      console.error("error uploading image", error);
    }
  };

  return (
    <>
      <div className="uploadPhoto">
        {photoImage ? (
          <AdvancedImage
            cldImg={cld
              .image(photoImage)
              .resize(fill().width(250))
              .format("auto")
              .quality("auto")}
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "200px",
              maxHeight: "250px",
            }}
          />
        ) : (
          <div
            style={{
              border: "solid 5px black",
              aspectRatio: "1/1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px",
            }}
          >
            <img
              src="./images/uploadimage.png"
              style={{ width: "50%", height: "50%" }}
            />
          </div>
        )}
      </div>
      <div className="createPostInput">
        <label>{props.msg}</label>
        <input
          className={props.photoContainer}
          name="img"
          type="file"
          onChange={uploadImage}
        />
      </div>
    </>
  );
};
export default UploadImage;
