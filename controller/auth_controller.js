const passport = require("../middleware/passport");

let authController = {
    login: (req, res) => {
        res.render("auth/login");
    },

    loginSubmit: (req, res, next) => {
        passport.authenticate("local", {
          successRedirect: "/list",
          failureRedirect: "/login",
        })(req, res, next);
      },

    googleSubmit: (req, res, next) => {
        passport.authenticate("google", {
          successRedirect: "/list",
          failureRedirect: "/login",
        })(req, res, next);
    },

    register: (req, res) => {
        res.render("auth/register")
    },

    registerSubmit: (req, res, next) => {
        res.send("To be implemented!")
    },
};

module.exports = authController;
