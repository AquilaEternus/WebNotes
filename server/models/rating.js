import mongoose from 'mongoose';
const { Schema } = mongoose;

const ratingSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    object_id: { type: Schema.Types.ObjectId },
    object_type: {
        type: String, 
        required: true
    },
    rating_type: {
        type: String,
        required: true
    },
    object: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'object_model'
    },
    object_model: {
        type: String,
        required: true,
        enum: ['Note', 'Comment']
    }
}, {timestamps: true});

const Rating = mongoose.model('Rating', ratingSchema);
export default Rating;