import express from 'express';
import {
    getUserNotes,
    getSearchedUserNotes,
    getRatingByUser,
    getUserLikedNotes,
    updateProfilePicture
} from '../controllers/userController';
import { storeProfilePicture } from '../helper/uploads/profilePicture';
import { authorizeUser } from '../middleware/authUser';
const router = express.Router();

router.get("/notes", authorizeUser, getUserNotes);
router.get("/notes/search", authorizeUser, getSearchedUserNotes);
router.get("/rating/:object_id", authorizeUser, getRatingByUser);
router.get('/liked/notes', authorizeUser, getUserLikedNotes);
router.put("/profile-picture", authorizeUser, storeProfilePicture, updateProfilePicture);

export default router;