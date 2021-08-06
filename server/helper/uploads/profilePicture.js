import path from 'path'; 
import cloudinary from 'cloudinary';
import DataURIParser from 'datauri/parser';
import multer from 'multer';

const datauri = new DataURIParser();
export const dataUri = req => datauri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

export const storeProfilePicture = multer({ storage: multer.memoryStorage() }).single('profile-pic');

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});


export const uploadPFPToCloudinary = (image, fn) => {
    cloudinary.v2.uploader.upload(image, { folder: 'profile_pictures' }, fn);
}

export const deletePFPFromCloudinary = (public_id, fn) => {
    cloudinary.v2.uploader.destroy(`profile_pictures/${public_id}`, {type : 'upload', resource_type : 'image', invalidate: true }, fn);
}