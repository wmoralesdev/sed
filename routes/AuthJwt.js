const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    const token = req.header('Authorize')

    if(!token) return res.status(401).send('Access denied')

    try {
        const verified = jwt.verify(token, process.env.TOKEN_KEY)
        req.client = verified 
        next()
    }
    catch(err) {
        res.status(400).send('Invalid token')
    }
}