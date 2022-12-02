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
                            monthlyIncome: [
                                {
                                    uuid: {
                                        type: String,
                                    },
                                    name: {
                                        type: String,
                                    },
                                    amount: {
                                        type: Number,
                                    },
                                }
                            ],
                            monthlyExpenses: [
                                {
                                    uuid: {
                                        type: String,
                                    },
                                    name: {
                                        type: String,
                                    },
                                    amount: {
                                        type: Number,
                                    },
                                }
                            ],
                            transactions: [
                                {
                                    uuid: {
                                        type: String,
                                    },
                                    name: {
                                        type: String,
                                    },
                                    amount: {
                                        type: Number,
                                    },
                                    type: {
                                        type: String,
                                    },
                                }
                            ],
                        },
                    ],
                },
            ],
        }
    ]
});

module.exports = mongoose.model('Accounts', dataSchema)