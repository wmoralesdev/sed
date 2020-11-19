const Ticket = require('../models/Ticket')

const TicketCtrl = { 
    generateTicket: async(req, res, next) => {
        try {
            console.log(req.body);
            let ticket = Ticket({
                clientId: req.client._id,
                flightId: req.body.flightId
            })

            await ticket.save();
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
    },
    
    showClientTickets: async(req, res, next) => {
        var clientTickets = await Ticket.find({clientId: req.client._id})
        return res.status(200).json(clientTickets)
    }
}

module.exports = TicketCtrl