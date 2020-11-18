var router = require('express').Router()
const ClientCtrl = require('../controllers/Client')
const Auth = require('./AuthJwt')

// GET
router.get('/', Auth, ClientCtrl.getCurrent)

// POST
router.post('/register', ClientCtrl.create)
router.post('/login', ClientCtrl.login)

// PUT
router.put('/update', Auth, ClientCtrl.update)

// DELETE
router.delete('/delete', Auth, ClientCtrl.delete)

module.exports = router