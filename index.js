const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");

app.use(express.static(path.join(__dirname, "public")));

const authController = require("./controller/auth_controller");
const animeController = require("./controller/anime_controller");
const passport = require("./middleware/passport");
const { ensureAuthenticated, forwardAuthenticated } = require("./middleware/check_auth");
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(ejsLayouts);

app.set("view engine", "ejs");

// Routes
app.get("/",  animeController.home);
app.get("/list", ensureAuthenticated, animeController.list);
app.get("/about",  (req, res) => {
    res.send("This page is currently under construction!")
});

app.get("/login", forwardAuthenticated, authController.login);
app.post("/login", authController.loginSubmit);

app.get("/register", forwardAuthenticated, authController.register);
app.post("/register", authController.registerSubmit);


app.get('/auth/google', forwardAuthenticated, passport.authenticate('google', { scope: ['profile'] }));
app.get('/auth/google/callback', forwardAuthenticated,
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/list');
    });
app.post('/auth/google', authController.googleSubmit);

app.listen(3000, function() {
    console.log(
        "Server running. Visit: localhost:3000"
    );
});
