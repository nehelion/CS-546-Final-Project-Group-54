const mainRoutes = require('./main');
const login = require('./login');
const signUp = require('./signup');
const private = require('./private');
const logOut = require('./logout');
const movie = require('./movie');
const searchpage = require('./searchpage');
const gen_action = require('./action');
const addmovie = require('./addmovie');

// FOR TESTING
const data = require('../data');
const moviesData = data.movies;

const constructorMethod = (app) => {
  app.use('/', mainRoutes);
  app.use('/login',login);
  app.use('/signup',signUp);  
  app.use('/private',private);
  app.use('/logout',logOut);
  app.use('/movie',movie);
  app.use('/searchpage',searchpage);
  app.use('/action', gen_action);
  app.use('/addmovie', addmovie);
  
  // FOR TESTING
  app.use('/sample', (req, res) => {
	//moviesData.addMovie();
    res.redirect('/private');
  });

  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;