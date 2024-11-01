import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import LoadingSpinner from "./LoadingSpinner";

const UploadImage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUDNAME },
  });
  const [photoImage, setPhotoImage] = useState("");

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    setIsLoading(true);

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
    setIsLoading(false);
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
        ) : !isLoading ? (
          <div
            style={{
              border: "solid 1px #6b6b6b",
              borderRadius: "20px",
              aspectRatio: "1/1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "5px",
            }}
          >
            <img
              src="/images/uploadimage.png"
              style={{ width: "50%", height: "50%" }}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LoadingSpinner />
          </div>
        )}
      </div>
      <div className="createPostInput">
        <input
          className={props.photoContainer}
          id="img"
          name="img"
          type="file"
          onChange={uploadImage}
          style={{ display: "none" }}
        />
        <label htmlFor="img" className="uploadBtn">
          Choose File
        </label>
      </div>
    </>
  );
};
export default UploadImage;
