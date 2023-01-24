# WebNotes

WebNotes is a social media application created using MERN stack in which users can create and publicly share rich text formatted notes online or keep it to themselves.

Demo: [https://webnotes-demo.herokuapp.com/](https://webnotes-demo.herokuapp.com/) - Type "@userzero" in search bar to view example notes.

### Features

-   Uses TinyMCE WYSIWYG editor to create/edit rich text notes.
-   Allows users to publish notes publicly or keep them private.
-   Search, comment on, and like publicly shared notes.

### Development Environment: Installation and Running

Install server dependencies in the root directory and start the server. If unable to start, check if the MONGODB_URI variable in the .env file is set to a running mongodb server. Also, check that the port number set to the PORT variable is available.

```sh
npm install
npm run serverDev
```

Install client dependencies and start the client server in the 'client' directory.

```sh
npm install
npm start
```

###### Note: Updating/uploading pictures will require using cloudinary.
