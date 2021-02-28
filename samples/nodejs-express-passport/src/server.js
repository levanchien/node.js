const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json);
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

require('./configs/passport.config');
require('./routes')(app);

app.listen(PORT, () => {
    console.log('Server listening on port: ' + PORT);
});
