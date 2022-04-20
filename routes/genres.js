const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    res.render('posts/genres', { title: "Genres:", allData: req.session.user })
});

module.exports = router;