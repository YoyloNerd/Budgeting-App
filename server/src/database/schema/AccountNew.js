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
            years: [
                {
                    year: {
                        type: Number,
                    },
                    months: [
                        {
                            month: {
                                type: String,
                            },
                            balance: {
                                type: Number,
                            },
                            transactions: [
                                {
                                    uuid: {
                                        type: String,
                                    }
                                },
                            ],
                        },
                    ],
                },
            ],
        }
    ]
});

module.exports = mongoose.model('AccountNew', dataSchema)