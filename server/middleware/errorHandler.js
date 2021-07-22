export const errorHandler = (error, req, res, next) => {
    res.status(error.status);
    res.json({msg: error.message});
};