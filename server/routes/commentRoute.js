import express from 'express';
import {
    postComment,
    postReplyToComment,
    getRepliesToComment,
    getNoteComments
} from '../controllers/commentController';
import { authorizeUser } from '../middleware/authUser';
const router = express.Router();

router.post("/", authorizeUser, postComment);
router.post("/:comment_id/reply", authorizeUser, postReplyToComment);
router.get("/:comment_id/replies", getRepliesToComment);
router.get('/note/:note_id', getNoteComments);

export default router;