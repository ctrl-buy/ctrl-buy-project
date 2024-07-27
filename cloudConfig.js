// cloudConfig.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ctrlbuy',
        allowed_formats: ['png', 'jpg', 'jpeg'],
    },
});

module.exports = {
    cloudinary,
    storage,
};
