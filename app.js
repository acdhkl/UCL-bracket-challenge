var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    Participant = require('./models/participant.js');

    // Participant.create(
    //     {
    //         name: "Sample1", 
    //         predictions: [
    //             "Manchester City",
    //             "Juventus",
    //             "Barcelona",
    //             "Bayern Munich",
    //             "Manchester City",
    //             "Barcelona",
    //             "Atletico Madrid",
    //             "PSG",
    //             "Barcelona",
    //             "Atletico Madrid",
    //             "Atletico Madrid"
    //         ],
    //         points: undefined
    //     }
    // )

var helpers = require("./helpers.js");
mongoose.connect("mongodb://localhost/bracket",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// ROOT ROUTE
app.get("/", function (req, res) {
    Participant.find({}, function(err, allParticipants){
        if(err) {
            console.log(err);
        } else {
            console.log(allParticipants);
            res.render("bracket", {
                predictions: helpers.calculatePoints(allParticipants),
                correctBracket: helpers.correctBracket
            });
        }
    });
});


//STARTING SERVER
app.listen(process.env.PORT || 3000, function () {
    console.log("Tournament bracket server started");
});