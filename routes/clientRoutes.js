const ClientCtrl = require('../controllers/clientCtrl')
const auth = require('../middleware/auth')

const router = require('express').Router()

router.route('/client')
    .get(auth, ClientCtrl.getClient)
    .post(auth, ClientCtrl.createClient)
    .put(auth, ClientCtrl.updateClient)

// router.route('/client')

// router.route('/client/:id')
//     .delete()

module.exports = router