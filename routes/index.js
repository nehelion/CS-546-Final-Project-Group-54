const mainRoutes = require('./main');
const login = require('./login');
const signUp = require('./signup');
const private = require('./private');
const logOut = require('./logout');
const movie = require('./movie');

const constructorMethod = (app) => {
  app.use('/', mainRoutes);
  app.use('/login',login);
  app.use('/signup',signUp);  
  app.use('/private',private);
  app.use('/logout',logOut);
  app.use('/movie',movie);

  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;