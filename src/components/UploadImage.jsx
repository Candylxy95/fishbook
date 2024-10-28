import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

const UploadImage = () => {
  const cld = new Cloudinary({ cloud: { cloudName: "dxbp8cza1" } });

  <div className="createPostInput">
    <label>Upload your catch: </label>
    <input name="img" type="file" />
  </div>;
  // Use this sample image or upload your own via the Media Explorer
  const img = cld
    .image("cld-sample-5")
    .format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

  return (
    <>
      <div className="createPostInput">
        <label>Upload your catch: </label>
        <input name="img" type="file" />
      </div>
      <AdvancedImage cldImg={img} />
    </>
  );
};

export default UploadImage;
