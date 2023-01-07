const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const AccountNew = require('../../database/schema/AccountNew');
const Transaction = require('../../database/schema/Transaction');

router.post("/newTransaction", async (req, res) => {
    console.log(req.body);
    let user;
    if (req.body.postmanTesting)
        user = await AccountNew.findOne({ uuid: req.user.uuid });
    else user = await AccountNew.findOne({ uuid: req.body.postmanID });
    const account = user.accounts.find(account => account.uuid === req.body.accountUUID);
    //if account does not exist return error
    if (!account) {
        res.status(400).send("Account does not exist");
        return;
    }

    //if end date does not exist, set it to 9999-12
    if (!req.body.endDate) {
        req.body.endDate = "9999-12";
    }

    //create transaction
    const transactionUUID = uuidv4();
    const transaction = await Transaction.create({
        uuid: transactionUUID,
        name: req.body.name,
        amount: req.body.amount,
        type: req.body.type,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    });

    //check if months contains year-month
    let yearMonth = req.body.startDate.split("-");
    yearMonth = yearMonth[0] + "-" + yearMonth[1];
    const month = account.months.find(month => month.date === yearMonth);
    
    if (!month) {
        //if not, create new month
        account.months.push({
            date: req.body.startDate,
            balance: req.body.amount,
            transactions: [transactionUUID]
        });
    } else {
        //if so, add transaction to month
        if (req.body.type === "income")
            month.balance += req.body.amount;
        else month.balance -= req.body.amount;

        month.transactions.push(transactionUUID);
    }

    await user.save();
    res.send(user.accounts);
})

module.exports = router;