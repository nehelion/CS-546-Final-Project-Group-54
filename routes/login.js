const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;

router.post('/', async (req, res) => {
  try {
    if (!req.body.username) {
      res.status(400);
      res.render('posts/login', {
        error: "Username cannot be empty.",
        notFound: false
      })
      return;
    }
    if (!req.body.password) {
      res.status(400);
      res.render('posts/login', {
        error: "Password cannot be empty.",
        notFound: false
      })
      return;
    }
    const { username, password } = req.body;
    let searchUser = await usersData.checkUser(username, password)
    if (!searchUser.authenticated || searchUser.authenticated != true) {
      res.status(400);
      res.render('posts/login', { error: "Incorrect username and/or password." })
      return;
    }
		else {
      let user = await usersData.getUser(username);
      req.session.user = { userName: username, theUser: user }
      res.redirect('/private');
    }
  } 
	catch (e) {
    res.status(500);
    res.render('posts/login', { error: e })
    return;
  }
});

module.exports = router;