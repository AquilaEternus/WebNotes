import mongoose from 'mongoose';
import { isEmail } from 'validator';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    pfp_url: {
        type: String,
        default: 'none',
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: [isEmail, 'Please enter a valid email.']
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Minimum password length is 8.']
    },
    role: {
        type: String,
        default: 'user',
        required: true
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;