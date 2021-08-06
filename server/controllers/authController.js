import User from '../models/user';
import Token from '../models/token';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { hashPassword, signAccessToken, signRefreshToken } from '../helper/auth';

/* Registers a new user in the database and logs them in with an access token. */
export const postRegister = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' })
        }
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Email is already in use.' });
        }

        user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'Username is already in use.' });
        }

        const hashedPassword = await hashPassword(password);
        if (!hashedPassword) {
            return res.status(500).json({ msg: 'Internal error occured.' })
        }
        try {
            let newUser = new User({ username, email, password: hashedPassword, pfp_url: '/public/default/avatar.png' });
            const savedUser = await newUser.save();
            const newRefreshToken = await Token.create({token: signRefreshToken(savedUser._id), user: savedUser.username});
            res.status(200).json({
                token: signAccessToken(savedUser._id), 
                refreshToken: newRefreshToken.token,
                user: {
                    id: savedUser._id,
                    username: savedUser.username,
                    email: savedUser.email,
                    pfp_url: savedUser.pfp_url,
                    createdAt: savedUser.createdAt
                }
            })         
        } catch (err) {
            const error = new Error('Internal error occurred.');
            error.status = 500;
            next(error);
        }
    } catch (err) {
        const error = new Error('Internal error occurred.');
        error.status = 500;
        next(error);
    }
}

/* Checks user email and password against those in database, and logs them in with an access token
if authenticated. */
export const postLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }
        
        try {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                let savedRefreshToken = await Token.findOne({user: user.username});
                if (!savedRefreshToken) {
                    savedRefreshToken = await Token.create({token: signRefreshToken(user._id), user: user.username});
                } else {
                    // Verifies refresh token already in database and creates a new one if an error occurrs.
                    jwt.verify(savedRefreshToken.token, process.env.REFRESH_TOKEN_SECRET, function(err, decoded) {
                        if (err) {
                            savedRefreshToken.token = signRefreshToken(user._id);
                            savedRefreshToken.save()
                                .then((token) => {
                                    // console.log("New Refresh Token generated.")
                                });
                        }
                      });
                }
                return res.status(200).json({
                    token: signAccessToken(user._id),
                    refreshToken: savedRefreshToken.token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        pfp_url: user.pfp_url,
                        createdAt: user.createdAt
                    }
                });
            }
            return res.status(400).json({ msg: 'Password is incorrect' })
        } catch (err) {
            // console.log(err)
            const error = new Error('Internal error occurred.');
            error.status = 500;
            next(error);
        }
    } catch (err) {
        const error = new Error('Internal error occurred.');
        error.status = 500;
        next(error);
    }
}

/* Deletes a user's refresh token from the database once a user logs out of the app. */
export const logout = async (req, res) => {
    try {
      const { refreshToken } = req.body;
      await Token.findOneAndDelete({ token: refreshToken });
      return res.status(200).json({ msg: "User logged out successfully." });
    } catch (err) {
        const error = new Error('Internal error occurred.');
        error.status = 500;
        next(error);
    }
};

/* Generates a new token for the user once the current access token expires. */
export const generateRefreshToken = async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(403).json({ msg: "Access denied." });
      } else {
        const savedRefreshToken = await Token.findOne({ token: refreshToken });
        if (!savedRefreshToken) {
          return res.status(401).json({ msg: "Token expired." });
        } else {
          const payload = jwt.verify(savedRefreshToken.token, process.env.REFRESH_TOKEN_SECRET);
          const token = jwt.sign({ id: payload.id }, process.env.TOKEN_SECRET, { expiresIn: "5m" });
          return res.status(200).json({ token });
        }
      }
    } catch (err) {
        const error = new Error('Internal error occurred.');
        error.status = 500;
        next(error);
    }
};

/* Get the data for the currently logged in user, excluding their password. */
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password').exec();
        res.json(user);
    } catch (err) {
        const error = new Error('Internal error occurred.');
        error.status = 500;
        next(error);
    }
}