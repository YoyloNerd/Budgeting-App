const Account = require('../database/schema/Account');

const router = require('express').Router();

router.get("/accounts", async (req, res) => {
    const user = await Account.findOne({ uuid: req.user.uuid });
    res.send(user.accounts);
})
router.post("/update", async (req, res) => {
    const user = await Account.findOne({ uuid: req.user.uuid });
    user.accounts = req.body.accounts;
    user.save();
    res.send(user);
})

module.exports = router;