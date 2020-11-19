const { Schema, model } = require('mongoose')

const Ticket = Schema({
    clientId: "String",
    flightId: "String"
})

module.exports = model("Ticket", Ticket)