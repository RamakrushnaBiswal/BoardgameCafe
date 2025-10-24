/** @format */

const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  const options = { folder };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";

  // Support two common input shapes:
  // 1) An uploaded file object provided by express-fileupload (has tempFilePath)
  // 2) A raw string (data URL or file path) that cloudinary.uploader.upload accepts
  if (file && file.tempFilePath) {
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  }

  // If file is a non-empty string, pass it directly to the uploader. This
  // allows callers to send base64/dataURI or remote URLs.
  if (typeof file === "string" && file.trim() !== "") {
    return await cloudinary.uploader.upload(file, options);
  }

  // If nothing valid is provided, throw a clear error to help debugging.
  throw new Error("No valid file provided to uploadImageToCloudinary");
};
