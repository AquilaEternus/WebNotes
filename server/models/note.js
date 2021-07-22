import mongoose from 'mongoose';
const { Schema } = mongoose;

const noteSchema = Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    // likes: {
    //     type: Number,
    //     default: 0
    // },
    // dislikes: {
    //     type: Number,
    //     default: 0
    // },
    isPrivate: {
        type: Boolean,
        default: true
    },
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);
export default Note;
