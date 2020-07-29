var helpersObj = {};

var correctBracket = [
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
];


// FIBONNACI STYLE SCORING FOR 2020 UCL BRACKET
helpersObj.calculatePoints = function (participants) {
    participants.forEach(function (participant) {
        var totalPoints = 0;
        for (i = 0; i < 4; i++) {
            if (participant.predictions[i] == correctBracket[i]) {
                totalPoints = totalPoints + 1;
            }
        }
        for (i = 4; i < 8; i++) {
            if (participant.predictions[i] == correctBracket[i]) {
                totalPoints = totalPoints + 2;
            }
        }
        for (i = 8; i < 10; i++) {
            if (participant.predictions[i] == correctBracket[i]) {
                totalPoints = totalPoints + 4;
            }
        }
        for (i = 10; i < 11; i++) {
            if (participant.predictions[i] == correctBracket[i]) {
                totalPoints = totalPoints + 8;
            }
        }
        participant.points = totalPoints;
    });
    return participants;
}


// Function to check if user can create a bracket
helpersObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        if(req.user.predictions !=  undefined){
            console.log("already made bracket")
            return res.redirect('/ucl');
        }
        return next();
    } else {
        console.log("need to log in");
        res.redirect("/login");
    }
};

helpersObj.correctBracket = correctBracket;
module.exports = helpersObj;