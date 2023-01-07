const Account = require('../database/schema/Account');
const router = require('express').Router();
const transactionsRouter = require('./Accounting/Transactions');
const accountRouter = require('./Accounting/Account');

router.get("/accounts", async (req, res) => {
    const user = await Account.findOne({ uuid: req.user.uuid });
    res.send(user.accounts);
})

router.post("/update", async (req, res) => {
    const user = await Account.findOne({ uuid: req.user.uuid });
    user.accounts = req.body.accounts;
    await user.save();
    res.send(user);
})
router.use("/transactions",transactionsRouter);
router.use("/Account",accountRouter);
module.exports = router;