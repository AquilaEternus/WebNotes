import express from 'express';
import {
    postObjectRating,
    updateObjectRating,
    deleteObjectRating,
    getObjectLikes,
    getObjectDislikes,
} from '../controllers/ratingController';
import { authorizeUser } from '../middleware/authUser';
const router = express.Router();

router.post("/note", authorizeUser, postObjectRating);
router.put("/note/:object_id", authorizeUser, updateObjectRating);
router.delete("/note/:object_id", authorizeUser, deleteObjectRating);
router.get("/:object_id/likes", getObjectLikes);
router.get("/:object_id/dislikes", getObjectDislikes);

export default router;