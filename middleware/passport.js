const passport = require("passport");
require("dotenv").config()
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userController = require("../controller/user_controller");

const localLogin = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
  },
  (username, password, done) => {
    const user = userController.getUserByUsernameAndPassword(username, password);
      console.log(user);

      return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

const googleLogin = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    scope: "https://www.googleapis.com/auth/userinfo.profile",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    const user = userController.getGoogleUserById(profile.id, profile.displayName, profile.name);
    if (user) {
        done(null, user)
    }
    else {
        done(null, false, {
            message: "Your login details are not valid. Please try again",
        });
    }
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.USR_ID);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin).use(googleLogin);
