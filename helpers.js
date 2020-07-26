var helpersObj = {};

const correctBracket = [
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

var participants = [
    {
        name: "Sample1",
        predictions: [
            "Real Madrid",
            "Juventus",
            "Napoli",
            "Bayern Munich",
            "Manchester City",
            "Bayern Munich",
            "RB Leipzig",
            "PSG",
            "Bayern Munich",
            "PSG",
            "PSG"
        ],
        points: undefined
    },
    {
        name: "Sample2", 
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
        ],
        points: undefined
    },
    {
        name: "Sample3",
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
        ],
        points: undefined
    }
];

participants.forEach(function(participant) {
    var totalPoints = 0;
    for(i=0; i<4; i++){
        if(participant.predictions[i] == correctBracket[i]) {
            totalPoints= totalPoints + 1;
        }
    }
    for(i=4; i<8; i++){
        if(participant.predictions[i] == correctBracket[i]) {
            totalPoints= totalPoints + 2;
        }
    }
    for(i=8; i<10; i++){
        if(participant.predictions[i] == correctBracket[i]) {
            totalPoints= totalPoints + 4;
        }
    }
    for(i=10; i<11; i++){
        if(participant.predictions[i] == correctBracket[i]) {
            totalPoints= totalPoints + 8;
        }
    }
    participant.points = totalPoints;
});

helpersObj.correctBracket = correctBracket;
helpersObj.participants = participants.sort((a, b) => (a.points > b.points) ? -1 : 1)
module.exports = helpersObj;