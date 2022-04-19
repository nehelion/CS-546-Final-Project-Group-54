const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    res.render('posts/addmovie', { title: "Add Movie Page", allData: req.session.user })
});

module.exports = router;