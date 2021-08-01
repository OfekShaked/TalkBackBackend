var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://ofek:1234@main.uawbr.mongodb.net/main?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;