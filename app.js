var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors')

var app = express();

const Client = require('./routes/Client')
const Flight = require('./routes/Flight')
const Ticket = require('./routes/Ticket')

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });

app.use('/client', Client)
app.use('/flight', Flight)
app.use('/ticket', Ticket)


module.exports = app;