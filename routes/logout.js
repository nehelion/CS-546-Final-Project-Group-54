const express = require('express');
const router = express.Router();

router.get('/logout', async (req, res) => {

    res.clearCookie('session')
    req.session.destroy();
    req.session = null;
    res.send('Logged Out');
    return res.render("posts/logout", {
        title: "Login",
        message: "You have been logged out.",
    });
});

module.exports = router;