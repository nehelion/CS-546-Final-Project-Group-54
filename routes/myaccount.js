const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  res.render('posts/myaccount', { title: "My Account", userDetails: req.session.user })
});

module.exports = router;