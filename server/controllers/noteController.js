import paginate from 'jw-paginate';
import Note from '../models/note';
import User from '../models/user';

/* Get all notes from the database in default ordering as a paginated list of five items. */
export const getAllNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({isPrivate: false})
            .populate({
                path: 'user',
                select: '-_id -password -email -__v -notes'
            }).exec();
            const page = parseInt(req.query.page) || 1;
            const pager = paginate(notes.length, page, (req.query.limit || 5));
            const pageOfNotes = notes.slice(pager.startIndex, pager.endIndex + 1);
            res.status(200).json({pager, pageOfNotes});
    } catch (err) {
        // console.log(err)
        const error = new Error('Internal error occurred.');
        error.status = 500;
        next(error);
    }
}

/* Get notes from a user based on their user name. */
export const getNotesByUser = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username }).exec();
        if (user) {
            try {
                const notes = await Note.find({ user: user._id, isPrivate: false}).select('-user').exec();
                if (notes) {
                    const allNotes = {
                        username: user.username,
                        notes
                    }
                    return res.status(200).json(allNotes);
                }
                return res.status(200).json([]);
            } catch(err) {
                // find() query resulted in an unexpected error. 
                // console.log(err)
                const error = new Error('Internal error occurred.');
                error.status = 500;
                next(error);
            }
        } else {
            throw new Error('Requested user not found.')
        }
    } catch (err) {
        // User with given username does not exist.
        const error = new Error('Internal error occurred.');
        error.status = 500;
        next(error);
    }
}

/* Get notes that matches a query value and return the result as a paginated list of five items. */
export const getSearchedNotes = async (req, res, next) => {
    try {
        if ('q' in req.query) {
            if (!req.query.q) {
                return res.status(200).json([]);
            }
            const { q } = req.query;
            const userHandle = q.split(' ', 1)[0];
            // console.log(userHandle)
            let notes = [];
            if (userHandle[0] === '@' && userHandle.length === q.length) {
                const username = userHandle.split('@')[1].trim();
                const userDoc = await User.find({username}, '_id').exec();
                notes = await Note.find({user: userDoc, isPrivate: false})
                .populate({
                    path: 'user',
                    select: '-_id -password -email -__v -notes'
                }).exec();
                // console.log(notes)
            } else {
                notes = await Note.find({title: { $regex: new RegExp(q), $options: 'i' }, isPrivate: false})
                .populate({
                    path: 'user',
                    select: '-_id -password -email -__v -notes'
                }).exec();
            }
            const page = parseInt(req.query.page) || 1;
            const pager = paginate(notes.length, page, (req.query.limit || 5));
            const pageOfNotes = notes.slice(pager.startIndex, pager.endIndex + 1);
            res.status(200).json({pager, pageOfNotes});
        }
        else {
            res.status(404).send({msg: "'q' parameter not provided."})
        }
    } catch (err) {
        //console.log(err)
        const error = new Error('Internal error occurred.');
        error.status = 500;
        next(error);
    }
}

/* Get a specific note's data by their id. */
export const getNoteById = async (req, res, next) => {
    try {
        const { note_id } = req.params;
        const note = await Note.findById(note_id)
        .populate({
            path: 'user',
            select: '-_id -password -email -__v'
        }).exec();
        const popNote = await note.execPopulate('user');
        if (!popNote.user.username) {
            // Note was not populated correctly in execPopulate() function
            const error = new Error('Internal error occurred.');
            error.status = 500;
            next(error);
        } else {
            // console.log(popNote);
            const newNote = {
                 _id: popNote._id,
                title: popNote.title,
                text: popNote.text,
                username: popNote.user.username,
                pfp_url: popNote.user.pfp_url,
                likes: popNote.likes,
                dislikes: popNote.dislikes,
                isPrivate: popNote.isPrivate,
                createdAt: popNote.createdAt,
                updatedAt: popNote.updatedAt
            };
            // console.log(newNote)
            return res.status(200).json(newNote);
        }   
    } catch (err) {
        // findById() query failed with given note_id.
        const error = new Error('Requested note does not exist.');
        error.status = 404;
        next(error);
    }
}

/* Update/Put the title, text, or privacy status of a specific note. */
export const updateNoteById = async (req, res, next) => {
    try {
        const { note_id } = req.params;
        const note = await Note.findById(note_id).exec();
        if (note.user.toString() === req.user.id) {
            const { title, text, isPrivate } = req.body;
            note.title = title;
            note.text = text;
            note.isPrivate = isPrivate;
            try {
                await note.save();
                return res.status(200).json(note);
            } catch(err) {
                // save() failed
                const error = new Error('Note could not be saved. Please try again in a moment.');
                error.status = 500;
                next(error);
            }   
        } else {
            // Authorized user requesting to update note is not owner
            // of the note due to mismatched user _ids.
            //console.log(err);
            const error = new Error('Forbidden. Not authorized.');
            error.status = 403;
            next(error);
        }
    }
    catch (err) {
        // findById() faild to find specified note.
        // console.log(err);
        const error = new Error('Requested note could not be found.');
        error.status = 404;
        next(error);
    }
}

/* Delete a note by its id from the database. */
export const deleteNoteById = async (req, res, next) => {
    try {
        const { note_id } = req.params;
        await Note.deleteOne({_id: note_id}).exec();
        res.status(200).json({msg: "Note deleted successfully."});
    }
    catch (err) {
        // deleteOne() could not find specified note to delete.
        // console.log(err);
        const error = new Error('Could not delete note');
        error.status = 404;
        next(error);
    }
}

/* Post a new note to the data base. */
export const postNote = async (req, res, next) => {    try {
        const { title, content, isPrivate } = req.body;
        const newNote = new Note({
            title, text: content, user: req.user.id, isPrivate
        });
        await newNote.save();
        res.status(200).json(newNote);
    } catch (err) {
        // save() failed
        // console.log(err);
        const error = new Error('Note could not be saved.');
        error.status = 500;
        next(error);
    }
}