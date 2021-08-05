export const errorHandler = (error, req, res, next) => {
    // console.log(error)
    res.status(error.status);
    res.json({msg: error.message});
};