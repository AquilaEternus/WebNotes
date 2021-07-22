import express from 'express';
import {
    getAllNotes,
    getNotesByUser,
    getSearchedNotes,
    getNoteById,
    updateNoteById,
    deleteNoteById,
    postNote
} from '../controllers/noteController'
import { authorizeUser } from '../middleware/authUser';
const router = express.Router();

router.get("/all", getAllNotes);
router.get("/byuser/:username", getNotesByUser);
router.get("/search", getSearchedNotes);
router.get("/:note_id", getNoteById);
router.put("/:note_id", authorizeUser, updateNoteById);
router.delete("/:note_id", authorizeUser, deleteNoteById);
router.post("/", authorizeUser, postNote);

export default router;