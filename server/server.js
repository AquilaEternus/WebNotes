import 'dotenv/config';
import path from 'path';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { errorHandler } from './middleware/errorHandler';

import authRoute from './routes/authRoute';
import commentRoute from './routes/commentRoute';
import noteRoute from './routes/noteRoute';
import ratingRoute from './routes/ratingRoute';
import userRoute from './routes/userRoute';

const app = express();

app.use(cors());
helmet.contentSecurityPolicy({
    directives: {
        "default-src":[ "'self'" ],
        "base-uri":[ "'self'" ],
        "font-src":[ "'self'", "https:", "data:" ],
        "frame-ancestors":[ "'self'" ],
        "img-src":[ "'self'", "data:", "http://res.cloudinary.com"], 
        "script-src":[ "'self'" ],
        "script-src-attr":[ "'none'" ],
        "style-src":[ "'self'", "https:", "'unsafe-inline'" ],
    }
});
app.use(helmet());
app.use(compression());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('common'));

// Routes
app.use('/v1/api/auth', authRoute);
app.use('/v1/api/comments', commentRoute);
app.use('/v1/api/notes', noteRoute);
app.use('/v1/api/ratings', ratingRoute);
app.use('/v1/api/user', userRoute);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

// Errors
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(result => {
        app.listen(process.env.PORT, () => {
            // console.log('Server is listening on ', process.env.PORT);;
        });
    })
    .catch(err => console.log(err))