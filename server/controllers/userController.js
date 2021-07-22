import paginate from 'jw-paginate';
import Note from '../models/note';
import Rating from '../models/rating';
import User from '../models/user';
import { unlinkAsync } from '../helper/upload';

/* Get a paginated list of notes belonging to the currently authorized user. */
export const getUserNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({ user: req.user.id })
            .populate({
                path: 'user',
                select: '-_id -password -email -__v -notes'
            }).exec();
        
        const page = parseInt(req.query.page) || 1;
        const pager = paginate(notes.length, page, (req.query.limit || 5));
        const pageOfNotes = notes.slice(pager.startIndex, pager.endIndex + 1);
        res.status(200).json({pager, pageOfNotes});
    } catch (err) {
        // find().populate() query failed
        const error = new Error('Internal error occurred.');
        error.status = 500;
        next(error);
    }
}

/* Get a paginated list of notes matching a specific title belonging to the currently authorized user */
export const getSearchedUserNotes = async (req, res, next) => {
    try {
        if ('q' in req.query) {
            const { q } = req.query;
            const notes = await Note.find({user: req.user.id, title: { $regex: new RegExp(q), $options: 'i' }})
            .populate({
                path: 'user',
                select: '-_id -password -email -__v -notes'
            }).exec();
            // console.log(req.query.page)
            const page = parseInt(req.query.page) || 1;
            const pager = paginate(notes.length, page, (req.query.limit || 5));
            const pageOfNotes = notes.slice(pager.startIndex, pager.endIndex + 1);
            // console.log(notes)
            res.status(200).json({pager, pageOfNotes});
        }
        else {
            res.status(404).send({msg: "'q' parameter not provided."})
        }
    } catch (err) {
        // find().populate() query failed
        const error = new Error('Internal error occurred.');
        error.status = 500;
        next(error);
    }
}

/* Get the rating the currently authorized user has of an object. */
export const getRatingByUser = async (req, res, next) => {
    try {
        const { object_id } = req.params;
        const rating = await Rating.findOne({ user: req.user.id, object_id }).exec();
        if (rating) {
            return res.status(200).json(rating);
        } 
        return res.status(200).json([]);
    } catch (err) {
        const error = new Error('Internal error occurred.');
        error.status = 500;
        next(error);
    }
}

/* Get all the notes in which the currently authorized user has given it a rating type of 'like'. */
export const getUserLikedNotes = async (req, res, next) => {
    try {
        const likedNotes = await Rating.find({ user: req.user.id, object_type: 'note', rating_type: 'like'})
            .select('-_id -__v -object_id -user -object_type -createdAt -updatedAt')
            .populate({
                path: 'object',
                select: '-__v -comments',
                match: {isPrivate: false},
                populate: {
                    path: 'user',
                    select: '-__v -email -password -createdAt -updatedAt'
                }
            })
            .exec();
        const page = parseInt(req.query.page) || 1;
        const pager = paginate(likedNotes.length, page, (req.query.limit || 5));
        const pageOfNotes = likedNotes.slice(pager.startIndex, pager.endIndex + 1);
        // console.log(pageOfNotes)
        res.status(200).json({pager, pageOfNotes});
    } catch (err) {
        //console.log(err)
        const error = new Error('Internal error occurred.');
        error.status = 500;
        next(error);
    }
}

/* Update/Put the avatar picture's pathname of the currently authorized user and save the new avatar picture 
locally in the server. */
export const updateUserAvatar = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.avatarUrl !== 'public/default/avatar.png') {
            try {
                await unlinkAsync(user.avatarUrl);
            } catch (err) {
                // console.log(err)
                const error = new Error('User avatar could not be updated.');
                error.status = 500;
                next(error);
            }
        }    
        user.avatarUrl = req.file.path;      
        try {
            await user.save();
            res.status(200).json({path: req.file.path});
        } catch(err) {
            // console.log(err)
            const error = new Error('User avatar could not be updated.');
            error.status = 500;
            next(error);
        }
    }
    catch (err) {
        // findById() faild to find specified note.
        // console.log(err);
        const error = new Error('Internal error occurred.');
        error.status = 500;
        next(error);
    }
}

