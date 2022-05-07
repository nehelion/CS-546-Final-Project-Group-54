const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  res.render('posts/myaccount', { userDetails: req.session.user.theUser })
});

module.exports = router;