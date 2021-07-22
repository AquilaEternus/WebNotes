import Comment from '../models/comment';
import Reply from '../models/reply';

/* Post new comment to the database relating to a specific note. */
export const postComment = async (req, res, next) => {
    try {
        const { note_id, comment_text } = req.body;
        const newComment = new Comment({ user: req.user.id, note_id: note_id, text: comment_text });
        await newComment.save();
        res.status(200).json(newComment);
    } catch (err) {
        // console.log(err);
        const error = new Error('Internal error occurred.');
        error.status = 500;
        next(error);
    }
}

/* Post new reply to the database relating to a specific comment. */
export const postReplyToComment = async (req, res, next) => {
    try {
        const { reply_text } = req.body;
        const trimmedText = reply_text.trim();
        if (trimmedText.length === 0) {
            throw new Error('');
        }
        const { comment_id } = req.params;
        const newReply = new Reply({ user: req.user.id, comment_id, text: reply_text});
        await newReply.save();
        return res.status(200).json(newReply);  
    } catch (err) {
        // console.log(err);
        const error = new Error('Internal error occurred. Reply could not be created.');
        error.status = 500;
        next(error);
    }
}

/* Get all replies to a comment by its comment's id. */
export const getRepliesToComment = async (req, res, next) => {
    try {
        const { comment_id } = req.params;
        const replies = await Reply.find({comment_id}).populate({
            path: 'user',
            select: '-_id -password -email -__v -notes'
        }).exec();;
        res.status(200).json(replies);
    } catch (err) {
        // console.log(err);
        const error = new Error('Internal error occurred.');
        error.status = 500;
        next(error);
    }
}

/* Get all comments to a note by it's note's id. */
export const getNoteComments = async (req, res, next) => {
    try {
        const { note_id } = req.params;
        const comments = await Comment.find({ note_id })
            .sort({createdAt: -1})
            .populate({
                path: 'user',
                select: '-_id -password -email -__v -notes'
            }).exec();
        res.status(200).json(comments);
    } catch (err) {
        // console.log(err);
        const error = new Error('Internal error occurred.');
        error.status = 500;
        next(error);
    }
}