var router = require('express').Router()
const FlightCtrl = require('../controllers/Flight')
const Auth = require('./AuthJwt')

// GET
router.get('/', FlightCtrl.showFlight)

// POST
router.post('/schedule', FlightCtrl.scheduleFlight)

// Delete
router.delete('/cancel', FlightCtrl.cancelFlight)

// Put
router.put('/reschedule', FlightCtrl.delayFlight)

module.exports = router