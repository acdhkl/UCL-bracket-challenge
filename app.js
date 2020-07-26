var express = require("express"),
    app = express();

var helpers = require("./helpers.js");


app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    var participants = helpers.participants;
    res.render("bracket.ejs", {
        predictions: participants,
        correctBracket: helpers.correctBracket
    });
});


//STARTING SERVER
app.listen(process.env.PORT || 3000, function () {
    console.log("Tournament bracket server started");
});