const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../model/user.model')
const bodyParser = require("body-parser")
require('dotenv').config();
//////////////////////////////////////////////////////////////////////
const app = express();
app.use(express.json())
//////////////////////////////////////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// Configure session middleware
app.use(session({
  secret: process.env.Secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: 'lax',
    secure: false, // Set to true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24 * 14 // 14 days
 }
}));
//////////////////////////////////////////////////////////////////////
// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());
//////////////////////////////////////////////////////////////////////
// Sample user database

//////////////////////////////////////////////////////////////////////
// Configure Passport local strategy for authentication
passport.use(new LocalStrategy({usernameField:'email'},
  async function(email, password, done) {
    try {
      let user = await User.findOne({email})
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
      let isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
        return done(null,false,{message:'Wrong Password!'});
      }
      done(null, user); // Successful login
    } catch (error) {
      done(null,false,{message : error}); 
    }
  }
));
//////////////////////////////////////////////////////////////////////
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findOne({ _id });
    done(null, user);
  } catch (error) {
    done(error);
  }
});


 function isLogged(req, res, next) {
    if (req.user) {
        return next();
    } 
    res.redirect('/login')
} 

// function NotLogod(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.redirect('/')
//   }
//   next()
// }

module.exports = {
  app : app,
  isLogged: isLogged
};

