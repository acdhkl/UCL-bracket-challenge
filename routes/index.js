var express = require("express");
var router = express.Router();
var passport = require("passport");
var Participant = require('../models/participant.js');
var helpers = require("../helpers.js");
var genres = helpers.genres;


// Landing page
router.get("/", function (req, res) {
    res.render("landing")
})


// Show campions leage competition
router.get("/UCL", function (req, res) {
    Participant.find({}, function (err, allParticipants) {
        if (err) {
            req.flash("error", "Something went wrong!")
            res.redirect("/");
        } else {
            console.log(helpers.calculatePoints(allParticipants).sort((a, b) => (a.points > b.points) ? -1 : 1));
            res.render("ucl", {  
                predictions: helpers.calculatePoints(allParticipants).sort((a, b) => (a.points > b.points) ? -1 : 1),
                correctBracket: helpers.correctBracket
            });
        }
    });
});

// Show register form
router.get('/register', function (req, res) {
    res.render('participants/register');
});

// Handle sign up logic
router.post('/register', function (req, res) {
    var newParticipant = new Participant({
        name: req.body.name,
        username: req.body.username,
        points: 0
    });
    Participant.register(newParticipant, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect('register');
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/ucl');
        });

    });
});

// Show login form
router.get('/login', function (req, res) {
    res.render('participants/login');
});

//handling login logic
router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/ucl',
        failureRedirect: '/login'
    }),
    function (req, res) {
    });

//logout route
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/ucl");
});

// SHOW NEW BRACKET PAGE
router.get("/UCL/new", helpers.canCreateBracket, function (req, res) {
    res.render("participants/newUcl");
});


router.post("/participants/new", function (req, res) {
    console.log("hi");
    console.log(req.user._id);
    Participant.findById(req.user._id, function (err, participant) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/UCL/new");
        }else if(req.body.team.length != 11){
            req.flash("error", "Make sure you fill out every spot!" );
            res.redirect("/UCL/new");
        } else {
            participant.predictions = req.body.team
            console.log(req.body.team);
            participant.save();
            res.redirect('/ucl');
        }
    });
});

module.exports = router;