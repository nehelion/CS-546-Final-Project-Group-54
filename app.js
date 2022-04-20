const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use('/public', static)
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}));

app.use('/private', (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render('posts/login', { title: "Login Screen", error: "User is not logged in." })
  } else {
    res.render('posts/private', { title: "Logged In", userDetails: req.session.user })
  }
});

app.use('/login', (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/private')
  } else {
    next()
  }
});

app.use('/logout', (req, res) => {
  res.clearCookie('session')
  req.session.destroy();
  res.render('posts/login', { title: "Logged out", msg: "You are logged out" })
});

app.use('/signup', (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/private')
  } else {
    next()
  }
});

var requestTime = function (req, res, next) {
  let CheckSession;
  if (req.session.user) {
    CheckSession = '(Authenticated User)';
  } else {
    CheckSession = '(Non-Authenticated User)';
  }
  console.log(`[${new Date().toUTCString()}] : ${req.method} ${req.originalUrl} ${CheckSession}`)
  next()
}

app.use(requestTime)

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});