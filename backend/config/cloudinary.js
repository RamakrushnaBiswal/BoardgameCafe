/** @format */

const cloudinary = require("cloudinary").v2; //! Cloudinary is being required

exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      // Configuring the Cloudinary to Upload MEDIA
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_SECRET,
    });
    console.log("Cloud connect successfully");
  } catch (error) {
    console.log("Error in connection of cloud");
    console.log(error.message);
  }
};
