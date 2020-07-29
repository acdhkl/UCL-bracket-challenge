var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Participant = require('./models/participant.js');

var helpers = require("./helpers.js");
const participant = require("./models/participant.js");
mongoose.connect("mongodb://localhost/bracket",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.use(require("cookie-session")({
    secret: "This is a secret shh",
    resave: false,
    saveUninitialized: false
}));

//PASSPORT CONFIG
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Participant.authenticate()));
passport.serializeUser(Participant.serializeUser());
passport.deserializeUser(Participant.deserializeUser());



app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.render("landing")
})

// Champions League route
app.get("/UCL", function (req, res) {
    Participant.find({}, function (err, allParticipants) {
        if (err) {
            console.log(err);
        } else {
            res.render("ucl", {
                predictions: helpers.calculatePoints(allParticipants).sort((a, b) => (a.points > b.points) ? -1 : 1),
                correctBracket: helpers.correctBracket
            });
        }
    });
});

// Show register form
app.get('/register', function (req, res) {
    res.render('participants/register');
});

// Handle sign up logic
app.post('/register', function (req, res) {
    var newParticipant = new participant({
        name: req.body.name,
        username: req.body.username,
        predictions:[],
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
app.get('/login', function (req, res) {
    res.render('participants/login');
});

//handling login logic
app.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/ucl',
        failureRedirect: '/login'
    }),
    function (req, res) {
    });

//logout route
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/ucl");
});

// SHOW NEW BRACKET PAGE
app.get("/UCL/new", helpers.isLoggedIn, function (req, res) {
    res.render("participants/newUcl");
});


app.post("/participants/new", function (req, res) {
    console.log("hi");
    console.log(req.user._id);
    Participant.findById(req.user._id, function(err, participant) {
        if (err || req.body.team.length != 11) {
            console.log("not full");
            res.redirect("/UCL/new");
        } else {
        participant.name = req.user.name
        participant.predictions = req.body.team
        participant.save();
        res.redirect('/ucl');
        }
    });
});

//STARTING SERVER
app.listen(process.env.PORT || 3000, function () {
    console.log("Tournament bracket server started");
});