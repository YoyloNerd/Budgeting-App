const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const AccountNew = require('../../database/schema/AccountNew');
const Transaction = require('../../database/schema/Transaction');

// POST — add new data
// PUT — replace existing data
// PATCH — update some existing data fields
// DELETE — delete existing data


router.post("/newAccount", async (req, res) => {
    /*
    {
        "name": "test",
    }
    */

    //find user
    let user;
    if (req.body.postmanTesting)
        user = await AccountNew.findOne({ uuid: req.user.uuid });
    else user = await AccountNew.findOne({ uuid: req.body.postmanID });

    //create account
    const accountUUID = uuidv4();
    const account = await AccountNew.create({
        uuid: accountUUID,
        name: req.body.name,
        months: [],
        transactions: []
    });
    
    //add account to user
    user.accounts.push(accountUUID);
    await user.save();
    res.send(user.accounts); 
})

module.exports = router;