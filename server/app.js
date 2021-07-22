import 'dotenv/config';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { errorHandler } from './middleware/errorHandler';

import authRoute from './routes/authRoute';
import commentRoute from './routes/commentRoute';
import noteRoute from './routes/noteRoute';
import ratingRoute from './routes/ratingRoute';
import userRoute from './routes/userRoute';

const app = express();

// Middleware
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Routes
app.use('/v1/api/auth', authRoute);
app.use('/v1/api/comments', commentRoute);
app.use('/v1/api/notes', noteRoute);
app.use('/v1/api/ratings', ratingRoute);
app.use('/v1/api/user', userRoute);

// Errors
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(result => {
        app.listen(process.env.PORT, () => {
            console.log('Server is listening on ', process.env.PORT);;
        });
    })
    .catch(err => console.log(err))