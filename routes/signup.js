const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;

router.get('/', async (req, res) => {
  try {
    if (req.session.user)
      return res.redirect('/private')
    else
      res.render('posts/signup')
  } 
	catch (e) {
    res.status(404).json({
      error: 'Not found'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    if (!req.body.username) {
      res.status(400);
      res.render('posts/signup', {
        error: "Username cannot be blank.",
        notFound: false
      })
      return;
    }
		if (req.body.username.length < 4) {
      res.status(400);
      res.render('posts/signup', {
        error: "Username must be at least 4 characters long",
        notFound: false
      })
      return;
    }
    if (!req.body.username.match(/^[A-Za-z0-9]+$/)) {
      res.status(400);
      res.render('posts/signup', {
        error: "Username must be alphanumeric and cannot have empty spaces",
        notFound: false
      })
      return;
    }
    if (!req.body.password) {
      res.status(400);
      res.render('posts/signup', {
        error: "Weak Password: Password cannot be blank.",
        notFound: false
      })
      return;
    }
    if (req.body.password.trim() == "") {
      res.status(400);
      res.render('posts/signup', {
        error: "Weak Password: Password cannot have empty spaces",
        notFound: false
      })
      return;
    }
		if (req.body.password.length < 6) {
      res.status(400);
      res.render('posts/signup', {
        error: "Weak Password: Password must be at least 6 characters long",
        notFound: false
      })
      return;
    }
    if (!req.body.email) {
      res.status(400);
      res.render('posts/signup', {
        error: "Email cannot be blank.",
        notFound: false
      })
      return;
    }
		if (!req.body.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      res.status(400);
      res.render('posts/signup', {
        error: "Email entered is invalid",
        notFound: false
      })
      return;
    }
    const { firstName, lastName, username, password, email } = req.body;

    let addUser = await usersData.createUser(firstName, lastName, username, password, email);
    
		if (addUser.userInserted) {
      let user = await usersData.getUser(username);
      req.session.user = { userName: username, theUser: user }
      res.redirect('/private');
    } 
		else {
      res.status(500);
      res.render('posts/signup', { error: "Internal Server Error" })
      return;
    }
  } 
	catch (e)
	{
    res.status(500);
    res.render('posts/signup', { error: e })
    return;
  }
});

module.exports = router;