require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const { initUserController } = require('./controllers/user.controller');
const { initPostsController } = require('./controllers/posts.controller');
const { initCommentsController } = require('./controllers/comments.controller');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

initUserController(app);
initPostsController(app);
initCommentsController(app);

const server = app.listen(PORT, () => {
    console.log('Server is listening on port: ' + PORT);
});

/* Use for test */
module.exports = {
    app,
    server
};
