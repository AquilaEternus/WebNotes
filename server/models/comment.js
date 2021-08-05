import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    note_id: { type: Schema.Types.ObjectId, ref: 'Note' },
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
    }, 
    replies: [{type: Schema.Types.ObjectId, ref: 'Reply'}]
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;