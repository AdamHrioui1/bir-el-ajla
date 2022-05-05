const mongoose = require('mongoose');

const FactureSchema = new mongoose.Schema({
    facture: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

const Facture = mongoose.model('Facture', FactureSchema)
module.exports = Facture