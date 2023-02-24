const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const app = express();
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const reactionsRoute = require('./routes/reactions')
const postsRoute = require('./routes/posts')
const commentsRoute = require('./routes/comments')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

app.use(passport.initialize());
// require("./middleware/passport")(passport);

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/socialmedia')
.then(() => console.log("Connected to database...."))
.catch(() => console.log('Could not connect to database'));

app.use(express.json());
app.use('/api/users',usersRoute);
app.use('/api/login', authRoute);
app.use('/api/reactions', reactionsRoute);
app.use('/api/posts', postsRoute);
app.use('/api/comments', commentsRoute);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))

