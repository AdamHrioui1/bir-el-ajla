const router = require('express').Router()
const FactureCtrl = require('../controllers/factureCtrl')

router.route('/facture')
    .get(FactureCtrl.getFactures)
    .post(FactureCtrl.createFacture)

module.exports = router