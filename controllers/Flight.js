const Flight = require('../models/Flight')

const FlightCtrl = { 
    scheduleFlight: async(req, res, next) => {
        try {
            let foundFlight = await Flight.find({aeroline: req.body.aeroline})

            var unique = true

            foundFlight.forEach(e => {
                if(e.schedule == req.body.schedule && e.origin == req.body.origin && e.destination == req.body.destination)
                    unique = false;
            })

            if(!unique)
                throw 409;

            let flight = Flight({
                capacity: req.body.capacity,
                schedule: req.body.schedule,
                aeroline: req.body.aeroline,
                origin: req.body.origin,
                destination: req.body.destination,
                price: req.body.price
            })

            flight.save();
            return res.status(200).json({error: false, message: "Success", _id: flight._id})
        }
        catch(err) {
            return res.status(err).json({error: true, message: "Something went wrong"})
        }
    },

    cancelFlight: async(req, res, next) => {
        try {
            await Flight.deleteOne({_id: req.body._id})
            return res.status(200).json({error: false, message: "Success"})
        }
        catch(err) {
            return res.status(500).json("Something went wrong")
        }
    },

    delayFlight: async(req, res, next) => {
        try {
            var actualFlight = await Flight.findOne({_id: req.body._id})

            if(!actualFlight)
                throw {error: true, message: "Not found"}

            actualFlight = {
                schedule: req.body.schedule
            }

            await Flight.findOneAndUpdate({_id: req.body._id}, actualFlight)
            return res.status(200).json(actualFlight)
        }
        catch (err) {
            console.log(err);
            return res.status(500).json("Something went wrong")
        }
    },

    showFlight: async(req, res, next) => {
        if(req.query._id) {
            var actualFlight = await Flight.findOne({_id: req.query._id})
            return res.status(200).json(actualFlight)
        }
        else {
            var actualFlights = await Flight.find({})
            return res.status(200).json(actualFlights)
        }
    }
}

module.exports = FlightCtrl