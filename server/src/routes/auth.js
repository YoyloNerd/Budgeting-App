const router = require('express').Router();
const passport = require('passport');

router.get("/google", passport.authenticate('google'), (req, res) => { res.redirect(process.env.DEV ? `http://localhost:3000` : "/") })

router.get("/user", (req, res) => {
    if (req.user) {
        res.send(req.user);
    } else {
        res.send("No user");
    }
})

module.exports = router;