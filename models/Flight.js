const { Schema, Model } = require('mongoose')

const Flight = Schema({
    capacity: Number,
    schedule: Date,
    origin: {
        type: "String",
        required: "true"
    },
    destination: {
        type: "String",
        required: "true"
    },
    price: {
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

module.exports = Model("Flight", Flight)