//new mongoose.Schema({}) is used to create a new schema
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
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
});

module.exports = mongoose.model('Transaction', dataSchema)