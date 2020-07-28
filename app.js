var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
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

app.use(bodyParser.urlencoded({
    extended: true
}));

// ROOT ROUTE
app.get("/", function (req, res) {
    Participant.find({}, function (err, allParticipants) {
        if (err) {
            console.log(err);
        } else {
            console.log(allParticipants);
            res.render("home", {
                predictions: helpers.calculatePoints(allParticipants).sort((a, b) => (a.points > b.points) ? -1 : 1),
                correctBracket: helpers.correctBracket
            });
        }
    });
});

// SHOW NEW PARTICIPANT PAGE
app.get("/participants/new", function (req, res) {
    res.render("participants/new");
});

app.post("/participants/new", function (req, res) {
    console.log(req.body)
    var newParticipant = new Participant({
        name: req.body.name,
        points: 0,
        predictions: req.body.team
    });
    Participant.create(newParticipant, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

//STARTING SERVER
app.listen(process.env.PORT || 3000, function () {
    console.log("Tournament bracket server started");
});