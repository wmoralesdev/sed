const { Schema, Model } = require('mongoose')

const Ticket = Schema({
    clientId: {
        type: "String",
        required: "true"
    },
    flightId: {
        type: "String",
        required: "true",
        unique: true
    }
})

module.exports = Model("Ticket", Ticket)