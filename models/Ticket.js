const { Schema, model } = require('mongoose')

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

module.exports = model("Ticket", Ticket)