import path from 'path';
import multer from 'multer';

/* Stores a user's custom avatar/profile-picture in the server's 'public/avatar/' folder. */
const storageAvatar = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/avatar/`)
      },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
});

export const uploadAvatar = multer({ storage: storageAvatar }).single('avatar');