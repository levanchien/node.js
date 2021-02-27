const express = require('express');
const httpLogger = require('./middlewares/http-logger.middlware');

const PORT = 3000;
const app = express();


app.use(httpLogger);

app.get('/', (req, res, next) => {
    res.send('Hello !');
});

app.listen(PORT, () => {
    console.log('Server start on port: ' + PORT);
});
