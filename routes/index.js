const mainRoutes = require('./main');
const login = require('./login');
const signUp = require('./signup');
const logOut = require('./logout');
const movie = require('./movie');
const searchpage = require('./searchpage');
const genre = require('./genre');
const addmovie = require('./addmovie');
const myaccount = require('./myaccount');


const constructorMethod = (app) => {
  app.use('/', mainRoutes);
  app.use('/login', login);
  app.use('/signup', signUp);
  app.use('/logout', logOut);
  app.use('/movie', movie);
  app.use('/searchpage', searchpage);
  app.use('/genre', genre);
  app.use('/addmovie', addmovie);
  app.use('/myaccount', myaccount);

  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;