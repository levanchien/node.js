const express = require('express');
var cookieParser = require('cookie-parser');

const app = express();

app.get('/set-cookie', cookieParser('xxx'), (req, res, next) => {
    res.cookie('site-name', 'levanchien.vn', { signed: true });
    res.json({ ok: true });
});

/* If wrong cookie or wrong secret key. The value will be false */
app.get('/get-cookie', cookieParser('xxx'), (req, res)=> {  
    console.log('[site-name] = ', req.cookies['site-name']); 
    console.log('[site-name] = ', req.signedCookies['site-name']); 
    res.json({ok: req.signedCookies});
})

app.listen(80, () => {
    console.log('Server listening on port 80');
});