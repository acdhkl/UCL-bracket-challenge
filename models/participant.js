var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//SCHEMA SETUP
var participantSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String, 
    predictions: [String],
    points: Number
});


participantSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Participant", participantSchema);