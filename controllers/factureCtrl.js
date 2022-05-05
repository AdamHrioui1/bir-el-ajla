const Facture = require("../models/factureModel")

const FactureCtrl = {
    getFactures: async (req, res) => {
        try {
            const factures = await Facture.find()
            return res.status(200).json(factures)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createFacture: async (req, res) => {
        try {
            const { facture } = req.body
            const newFacture = new Facture({
                facture
            })
            await newFacture.save()

            return res.json(newFacture)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = FactureCtrl