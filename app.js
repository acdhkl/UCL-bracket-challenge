var express = require("express"),
    app = express();


app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    var participants = [
        {
            name: "Avinav", 
            predictions: [
                "Real Madrid",
                "Juventus",
                "Barcelona",
                "Bayern Munich",
                "Juventus",
                "Bayern Munich",
                "Atletico Madrid",
                "PSG",
                "Bayern Munich",
                "Atletico Madrid",
                "Bayern Munich"
            ]
        },
        {
            name: "Gareema",
            predictions: [
                "Manchester City",
                "Lyon",
                "Napoli",
                "Chelsea",
                "Manchester City",
                "Chelsea",
                "RB Leipzig",
                "Atalanta",
                "Manchester City",
                "Atalanta",
                "Atalanta"
            ]
        },
        {
            name: "Sunniva",
            predictions: [
                "Manchester City",
                "Juventus",
                "Napoli",
                "Bayern Munich",
                "Manchester City",
                "Bayern Munich",
                "RB Leipzig",
                "PSG",
                "Bayern Munich",
                "PSG",
                "Atalanta"
            ]
        }
    ];
    res.render("bracket.ejs", {predictions:participants});
});


//STARTING SERVER
app.listen(process.env.PORT || 3000, function () {
    console.log("Tournament bracket server started");
});