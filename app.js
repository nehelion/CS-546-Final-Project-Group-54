const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');

// move later - Alex
const data = require('./data');
const moviesData = data.movies;
//

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

app.use('/private', async (req, res, next) => 
{
  if (!req.session.user) 
	{
    return res.status(403).render('posts/login', { title: "Login Screen", error: "User is not logged in." })
  } 
	else 
	{
		let movies = await moviesData.getAllMovies();
		console.log("GETTING MOVIES 0");
		console.log("--string:" + JSON.stringify(movies));
		//{ title: "Film Foray", movieList: movies[0] }
    res.render('posts/private', { title: "Logged In", userDetails: req.session.user, moviesList: movies[0]._id })
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
  res.render('posts/private', { title: "Logged out", msg: "You are logged out" })
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

app.listen(3017, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3017');
});