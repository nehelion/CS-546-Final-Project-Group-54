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
        title: "Login",
        notFound: false
      })
      return;
    }
    if (!req.body.password) {
      res.status(400);
      res.render('posts/login', {
        error: "Password cannot be empty.",
        title: "Login",
        notFound: false
      })
      return;
    }
    const { username, password } = req.body;
    let searchUser = await usersData.checkUser(username, password)
    if (!searchUser.authenticated || searchUser.authenticated != true) {
      res.status(400);
      res.render('posts/login', { title: "Login", error: "Incorrect username and/or password." })
      return;
    }
		else {
      req.session.user = { userName: username }
      res.redirect('/private');
    }
  } 
	catch (e) {
    res.status(500);
    res.render('posts/login', { title: "Login", error: e })
    return;
  }
});

module.exports = router;