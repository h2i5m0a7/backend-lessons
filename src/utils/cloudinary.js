import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async function (localfilepath) {
  try {
    if (!localfilepath) return null;
    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto"
    });
    console.log("File uploaded successfully!", response.url);
    await fs.unlink(localfilepath); // Delete local file after successful upload
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    try {
      await fs.unlink(localfilepath); // Ensure the local file is deleted on error
    } catch (unlinkError) {
      console.error("Error deleting local file:", unlinkError);
    }
    return null;
  }
};

export { uploadOnCloudinary };
