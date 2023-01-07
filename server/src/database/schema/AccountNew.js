const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
    },
    googleID: {
        type: String,
        required: true,
        unique: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    accounts: [
        {
            name: {
                type: String,
                required: true,
            },
            uuid: String,
            months: [
                {
                    date: String,// year-month:xxxx-xx
                    balance: Number,
                    transactions: [String]
                },
            ],
        }
    ]
});

module.exports = mongoose.model('AccountNew', dataSchema)