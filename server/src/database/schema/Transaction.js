//new mongoose.Schema({}) is used to create a new schema
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
    },
    name: String,
    amount: Number,
    to: String,//uuid of account if it is a transfer
    type: String, //income, expense, transfer
    startDate: String,// year-month-day:xxxx-xx-xx
    endDate: String// year-month-day:xxxx-xx-xx
});

module.exports = mongoose.model('Transaction', dataSchema)