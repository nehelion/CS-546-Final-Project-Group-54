const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');

// move later - Alex
const data = require('./data');
const moviesData = data.movies;
const usersData = data.users;
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

app.use('/private', async (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render('posts/login', { title: "Login Screen", error: "User is not logged in." })
  }
  else {
    let movies = await moviesData.getAllMovies();
	
	movies = await moviesData.sortMovies(movies);

    var movieList = [];

    for (let i = 0; i < movies.length; i++) {
      movieList.push({
        title:
          "<div class='item'><a href='/movie/" + movies[i]._id + "'>" +
          "<img src='https://www.creativefabrica.com/wp-content/uploads/2020/01/31/filmstrip-tapes-movie-cinema-film-logo-Graphics-1.jpg' alt='Describe Image'>" +
          "<h3>" + movies[i].movieTitle + "</h3>" +
          "</a></div>"
      });
    }
	
	let likedMovies = await usersData.getAllLikedMovies(req.session.user.userName);
	
	var likedMovieList = [];
	
	try 
	{
		for (let i = 0; i < likedMovies.length; i++) 
		{
		
			let addingMovie = await moviesData.getMovie(likedMovies[i]);
			likedMovieList.push(addingMovie);
		}
	
		likedMovieList = await moviesData.sortMovies(likedMovieList);
	}
	catch (e) 
	{
		res.status(500);
		res.render('posts/private', { title: "Film Foray", error: e })
		return;
	}
	
    res.render('posts/private', { title: "Logged In", userDetails: req.session.user, movies: movieList, likedMovies: likedMovieList })
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

app.listen(3018, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3018');
});