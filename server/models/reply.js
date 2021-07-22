import mongoose from 'mongoose';
const { Schema } = mongoose;

const replySchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    comment_id: { type: Schema.Types.ObjectId, ref: 'Comment' },
    text: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Reply = mongoose.model('Reply', replySchema);

export default Reply;