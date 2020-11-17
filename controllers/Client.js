const Client = require('../models/Client')
const { hash, compare } = require('bcrypt')

var ClientCtrl = {
    create: async(req, res, next) => {
        try {
            let foundClient = Client.findOne({username: req.body.username})

            if(foundClient)
                throw 409;

            let hashedPassword = await hash(req.body.password, 10)

            let client = Client({
                name: req.body.name,
                username: req.body.username,
                password: hashedPassword
            })

            client.save();
            return res.status(200).json({error: false, message: "Success"})
        }
        catch(err) {
            return res.status(err).json({error: true, message: "Something went wrong"})
        }
    },

    login: async(req, res, next) => {
        try {
            if(!req.body.username && !req.body.password)
                throw 400
            
            const client = await Client.findOne({username: req.body.username})

            if(client == null)
                return res.status(404).json({error: true, message: "Username not found"})

            var logged = await compare(req.body.password, client.password)
            if(!logged) return res.status(400).json({error: true, message: "Wrong password"})

            const token = jwt.sign({_id: client._id}, process.env.TOKEN_KEY)
            return res.header('Authorize', token).status(200).json(token)
        }
        catch(err) {
            return res.status(err).json({error: true, message: "Something went wrong"})
        }
    },

    delete: async(req, res, next) => {
        try {
            await Client.deleteOne({_id: req.client._id})
            return res.status(200).json({error: false, message: "Success"})
        }
        catch(err) {
            return res.status(500).json("Something went wrong")
        }
    },

    update: async(req, res, next) => {
        try {
            var actualClient = await Client.findOne({_id: req.client._id})
            const matchUsers = await Client.find({ username: req.body.username })

            if(matchUsers.length != 0)
                throw {error: true, message: "Email or username already registered"}

            var hashedPassword = req.body.password == null ? null : await bcrypt.hash(req.body.password, 10)

            actualClient = {
                name: req.body.name || actualClient.name,
                username: req.body.username || actualClient.username,
                password: hashedPassword || actualClient.password
            }

            await Client.findOneAndUpdate({_id: req.client._id}, actualClient)
            return res.status(200).json(actualClient)
        }
        catch (err) {
            return res.status(500).json("Something went wrong")
        }
    },

    getCurrent: async(req, res, next) => {
        const client = await Client.findOne({_id: req.client._id})
        return res.status(200).json(client)
    },
}

module.exports = ClientCtrl