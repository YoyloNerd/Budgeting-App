const Account = require('../database/schema/Account');
const AccountNew = require('../database/schema/AccountNew');
const Transaction = require('../database/schema/Transaction');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

router.get("/accounts", async (req, res) => {
    const user = await Account.findOne({ uuid: req.user.uuid });
    res.send(user.accounts);
})

router.post("/newTransaction", async (req, res) => {
    const user = await AccountNew.findOne({ uuid: req.user.uuid });
    const account = user.accounts.find(account => account.name === req.body.account);
    //create transaction
    const transactionUUID = uuidv4();
    const transaction = new Transaction({
        uuid: transactionUUID,
        name: req.body.name,
        amount: req.body.amount,
        type: req.body.type,
    });
    await transaction.save();
    //if account exists, add transaction to account
    //if more months exist, add transaction to all consecutive months
    //if more years exist, add transaction to all consecutive years
    if (account) {
        const year = account.years.find(year => year.year === req.body.year);
        if (year) {
            const month = year.months.find(month => month.month === req.body.month);
            if (month) {
                month.transactions.push({ uuid: transactionUUID });

                //add to all consecutive months
                const monthIndex = year.months.indexOf(month);
                for (let i = monthIndex + 1; i < year.months.length; i++) {
                    year.months[i].balance += req.body.amount;
                    year.months[i].transactions.push({ uuid: transactionUUID });
                }

                //add to all consecutive years
                const yearIndex = account.years.indexOf(year);
                for (let i = yearIndex + 1; i < account.years.length; i++) {
                    account.years[i].months.forEach(month => {
                        month.balance += req.body.amount;
                        month.transactions.push({ uuid: transactionUUID });
                    })
                }
            }
        }
    }

    await user.save();
    res.send(user.accounts);
})

router.post("/update", async (req, res) => {
    const user = await Account.findOne({ uuid: req.user.uuid });
    user.accounts = req.body.accounts;
    await user.save();
    res.send(user);
})

module.exports = router;