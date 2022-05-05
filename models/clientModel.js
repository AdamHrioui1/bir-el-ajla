const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    counterNumber: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Array,
        default: []
    }
},{
    timestamps: true
})

const Client = mongoose.model('Client', ClientSchema)
module.exports = Client