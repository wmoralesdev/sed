const { Schema, model } = require('mongoose')

const Client = Schema({
    name: {
        type: "String",
        required: "true"
    },
    username: {
        type: "String",
        required: "true",
        unique: true
    },
    password: {
        type: "String",
        required: "true"
    }
})

module.exports = model("Client", Client)