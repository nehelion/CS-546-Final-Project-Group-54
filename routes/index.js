const mainRoutes = require('./main');
const login = require('./login');
const signUp = require('./signup');
const priv = require('./private');
const logOut = require('./logout');
const movie = require('./movie');
const searchpage = require('./searchpage');
const gen_action = require('./genres');
const addmovie = require('./addmovie');

const constructorMethod = (app) => {
  app.use('/', mainRoutes);
  app.use('/login',login);
  app.use('/signup',signUp);  
  app.use('/private',priv);
  app.use('/logout',logOut);
  app.use('/movie',movie);
  app.use('/searchpage',searchpage);
  app.use('/action', gen_action);
  app.use('/addmovie', addmovie);

  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;