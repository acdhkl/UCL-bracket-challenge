var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    passport = require("passport"),
    flash = require("connect-flash"),
    LocalStrategy = require("passport-local"),
    Participant = require('./models/participant.js'),
    indexRoutes = require('./routes/index'),
    helpers = require("./helpers.js");
    
const participant = require("./models/participant.js");
mongoose.connect("mongodb+srv://avinav:avinav@bracket.dizmo.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("cookie-session")({
    secret: "This is a secret shh",
    resave: false,
    saveUninitialized: false
}));


app.use(flash());

//PASSPORT CONFIG
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Participant.authenticate()));
passport.serializeUser(Participant.serializeUser());
passport.deserializeUser(Participant.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");


app.use(indexRoutes);

//STARTING SERVER
app.listen(process.env.PORT || 3000, function () {
    console.log("Tournament bracket server started");
});