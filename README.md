# WebNotes

WebNotes is a web application created using MERN stack in which users can create and share with one another rich text formatted notes online.

### Features

- Uses TinyMCE WYSIWYG editor to create/edit rich text notes.
- Allows users to publish notes publicly or keep them private.
- Search, comment on, and like publicly shared notes.

### Development Environment: Installation and Running

Install server dependencies and start the server in the 'server' directory. If unable to start, check if the MONGODB_URI variable in the .env file is set to a running mongodb server. Also, check that the port number set to the PORT variable is available. 

```sh
npm install
npm run dev
```

Install client dependencies and start the client server in the 'client' directory.

```sh
npm install
npm start
```

###### Note: Set TOKEN_SECRET and REFRESH_TOKEN_SECRET variables to more secure values.
