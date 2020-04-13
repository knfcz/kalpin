require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const registerActions = require('./src/http/actions');

const User = require('~models/User');
const Note = require('~models/Note');
const Folder = require('~models/Folder');

User.init();
Note.init();
Folder.init();


if (!process.env.APP_KEY) {
    throw new Error('You must set APP_KEY in .env first');

}

app.use(bodyParser.urlencoded());


app.listen(process.env.SERVER_PORT, () => {
    registerActions(app);
    console.log(`Server listening on port ${process.env.SERVER_PORT} on ${process.env.NODE_ENV} mode`);
});
