import express from 'express';
import { 
    postRegister, 
    postLogin,
    logout,
    generateRefreshToken,
    getUser } from '../controllers/authController';
import { authorizeUser } from '../middleware/authUser';

const router = express.Router();

router.post("/register", postRegister);
router.post("/login", postLogin);
router.post("/refresh-token", generateRefreshToken);
router.delete("/logout", logout);
router.get("/user", authorizeUser, getUser);

export default router;