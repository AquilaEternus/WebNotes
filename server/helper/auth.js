import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

/* Used in hashing a user's password before it is saved in the database. */
export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt();
        try {
            const hashedPassword = await bcrypt.hash(password, salt);
            return hashedPassword;
        } catch (err) {
            return null;
        }
    } catch (err) {
        return null;
    }
}

/* Signs a new access token for 5 minutes using a user's ID. */
export const signAccessToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.TOKEN_SECRET, { expiresIn: '5m' });
}

/* Signs a new refresh token that lasts a week using a user's ID. */
export const signRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}