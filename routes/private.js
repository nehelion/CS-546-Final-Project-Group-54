const express = require('express');
const router = express.Router();


router.get('/private', async (req, res) => {
    res.render('posts/private', { title: "Logged In", allData: req.session.user })
});

module.exports = router;