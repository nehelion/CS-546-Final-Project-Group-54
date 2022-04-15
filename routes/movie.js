const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    res.render('posts/movie', { title: "Movie Page", allData: req.session.user })
});

module.exports = router;