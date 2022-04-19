const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    res.render('posts/action', { title: "Genre: Action", allData: req.session.user })
});

module.exports = router;