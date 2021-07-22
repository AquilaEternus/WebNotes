import Rating from '../models/rating';

/* Post a new rating (like/dislike) for a specific object by a user. */
export const postObjectRating = async (req, res, next) => {
    try {
        const { object_id, rating_type } = req.body;
       
        const rating = await Rating.findOne({object_id: object_id, user: req.user.id}).exec();
        // console.log(rating)
        if (!rating) {
            const newRating = new Rating({ 
                object_id, 
                user: req.user.id, 
                rating_type, 
                object_type: 'note',
                object: object_id,
                object_model: 'Note'
            });
            // console.log(newRating)
            await newRating.save();
            return res.status(200).json({msg: "Note rating created successfully."});
        }
        return res.status(200).status({msg: 'Rating already exists.'})
    } catch (err) {
        // console.log(err)
        const error = new Error('Could not like post.');
        error.status = 500;
        next(error);
    }
}

/* Update/Put an existing rating (like/dislike) for a specific object by a user. */
export const updateObjectRating = async (req, res, next) => {
    try {
        const { rating_type } = req.body;
        const { object_id } = req.params;
        //console.log(req.body)
        const rating = await Rating.findOne({object_id: object_id, user: req.user.id}).exec();
        // console.log(rating)
        if (rating) {
            if (rating.rating_type !== rating_type){
                try {
                    rating.rating_type = rating_type;
                    await rating.save();
                    return res.status(200).json({msg: "Note rating updated successfully."});
                } catch (err) {
                    // console.log(err)
                    const error = new Error('Could not update rating.');
                    error.status = 500;
                    next(error);
                }
            }
        }
    } catch (err) {
        // console.log(err)
        const error = new Error('Could not update rating.');
        error.status = 500;
        next(error);
    }
}

/* Delete an existing rating (like/dislike) for a specific object by a user. */
export const deleteObjectRating = async (req, res, next) => {
    try {
        const { object_id } = req.params;
        //console.log(req.body)
        const rating = await Rating.deleteOne({object_id: object_id, user: req.user.id}).exec();
        // console.log(rating)
        res.status(200).json({msg: "Note rating deleted successfully."});
    } catch (err) {
        // console.log(err)
        const error = new Error('Could not like post.');
        error.status = 500;
        next(error);
    }
}

/* Get the total amount of ratings with a rating type of 'like' that an object has. */
export const getObjectLikes = async (req, res, next) => {
    try {
        const { object_id } = req.params;
        const count = await Rating.countDocuments({object_id, rating_type: 'like'});
        return res.status(200).json({count});
    } catch (err) {
        // console.log(err)
        const error = new Error('Internal error occurred.');
        error.status = 500;
        next(error);
    }
}

/* Get the total amount of ratings with a rating type of 'dislike' that an object has. */
export const getObjectDislikes = async (req, res, next) => {
    try {
        const { object_id } = req.params;
        const count = await Rating.countDocuments({object_id, rating_type: 'dislike'});
        return res.status(200).json({count});
    } catch (err) {
        // console.log(err)
        const error = new Error('Internal error occurred.');
        error.status = 500;
        next(error);
    }
}