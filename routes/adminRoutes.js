const adminCtrl = require('../controllers/adminCtrl')
const router = require('express').Router()

// router.post('/register', adminCtrl.register)
router.post('/login', adminCtrl.login)
router.get('/logout', adminCtrl.logout)
router.get('/refreshtoken', adminCtrl.refreshToken)

module.exports = router