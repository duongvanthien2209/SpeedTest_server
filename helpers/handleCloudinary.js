// Cloudinary - Dùng để upload file lên cloud
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function uploadImage(path) {
  const result = await cloudinary.uploader.upload(path);
  return result.url;
}

module.exports = uploadImage;
