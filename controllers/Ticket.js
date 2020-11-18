const Ticket = require('../models/Ticket')

const TicketCtrl = { 
    generateTicket: async(req, res, next) => {
        try {
            let ticket = Ticket({
                clientId: req.body.clientId,
                flightId: req.body.flightId
            })

            ticket.save();
            return res.status(200).json({error: false, message: "Success", _id: ticket._id})
        }
        catch(err) {
            return res.status(err).json({error: true, message: "Something went wrong"})
        }
    },

    deleteTicket: async(req, res, next) => {
        try {
            await Ticket.deleteOne({_id: req.body._id})
            return res.status(200).json({error: false, message: "Success"})
        }
        catch(err) {
            return res.status(500).json("Something went wrong")
        }
    },

    showTicket: async(req, res, next) => {
        var actualTicket = await Ticket.findOne({_id: req.query._id})
        return res.status(200).json(actualTicket)
    }
}

module.exports = TicketCtrl