var mongoose = require("mongoose");

//SCHEMA SETUP
var participantSchema = new mongoose.Schema({
    name: String,
    predictions: [String],
    points: Number
});

module.exports = mongoose.model("Participant", participantSchema);