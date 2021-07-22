import express from 'express';
import {
    getUserNotes,
    getSearchedUserNotes,
    getRatingByUser,
    getUserLikedNotes,
    updateUserAvatar
} from '../controllers/userController';
import { uploadAvatar } from '../middleware/uploads';
import { authorizeUser } from '../middleware/authUser';
const router = express.Router();

router.get("/notes", authorizeUser, getUserNotes);
router.get("/notes/search", authorizeUser, getSearchedUserNotes);
router.get("/rating/:object_id", authorizeUser, getRatingByUser);
router.get('/liked/notes', authorizeUser, getUserLikedNotes);
router.put("/avatar", authorizeUser, uploadAvatar, updateUserAvatar);

export default router;