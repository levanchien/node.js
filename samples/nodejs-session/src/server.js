const app = require('express')();
const session = require('express-session');

app.use(session({
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 },
  resave: true
}));

app.get('/set-session', (req, res, next) => {
  const key = req.query.key;
  const value = req.query.value;
  req.session[key] = value;
  res.send('OK');
});

app.get('/get-session', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.write(`<p>Session[${req.query.key}] = ${req.session[req.query.key]}</p>`);
  res.end();
});


app.get('/', function (req, res, next) {
  if (req.session.views) {
    console.log(req.sessionID);
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
});

app.listen(80);
