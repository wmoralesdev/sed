var router = require('express').Router()
const TicketCtrl = require('../controllers/Ticket')
const Auth = require('./AuthJwt')

// GET
router.get('/', TicketCtrl.showTicket)
router.get('/all', Auth, TicketCtrl.showClientTickets)

// POST
router.post('/generate', Auth, TicketCtrl.generateTicket)

// Delete
router.delete('/cancel', TicketCtrl.deleteTicket)

module.exports = router