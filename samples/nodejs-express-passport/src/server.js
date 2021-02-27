const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./configs/passport.config');
require('./routes')(app);

app.listen(PORT, () => {
    console.log('Server listening on port: ' + PORT);
});
