var router = require('express').Router()
const TicketCtrl = require('../controllers/Ticket')

// GET
router.get('/', TicketCtrl.showTicket)

// POST
router.post('/generate', TicketCtrl.generateTicket)

// Delete
router.delete('/cancel', TicketCtrl.deleteTicket)

module.exports = router