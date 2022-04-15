const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        if (req.session.user)
            return res.redirect('/private')
        else
            res.render('posts/login', { title: "Login" })
    } catch (e) {
        res.status(404).json({
            error: '404: Page Not found'
        });
    }
});

module.exports = router;