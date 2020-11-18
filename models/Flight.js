const { Schema, model } = require('mongoose')

const Flight = Schema({
    capacity: Number,
    schedule: Date,
    aeroline: "String",
    origin: {
        type: "String",
        required: "true"
    },
    destination: {
        type: "String",
        required: "true"
    },
    price: {
        type: Number,
        get: getPrice,
        set: setPrice
    }
})

function getPrice(price) {
    return price / 100
}

function setPrice(price) {
    return price * 100
}

module.exports = model("Flight", Flight)