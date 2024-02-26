//Configure Passport.js:
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
require('dotenv').config()
const path = require("path");
const app = express();


app.use(express.static (path.join(__dirname, "client")));
app.get('/',(req,res)=>{
    res.sendFile('index.html')
})
app.use(express.json());
app.use(session({
     secret: 'secret', resave: false, saveUninitialized: false }
));

app.use(passport.initialize());
app.use(passport.session());

////////////////////////////////////////////////////////////////////////////////
//Set Up Google Authentication Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.client_id,
    clientSecret: process.env.client_secret,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    done(null,profile);
  }
));
//////////////////////////////////////////////////////////////////////////////////
//Serialize and Deserialize User
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null,user);
});
////////////////////////////////////////////////////////////////////////////
//Set Up Authentication Routes:
app.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }) 
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' , successRedirect : '/profile'}),
);

//////////////////////////////////////////////////////////////////////////////////
//Protect Routes and Retrieve User Data
app.get('/login', (req, res) => {
    res.send('<h1>YOU NEED TO LOGIN</h1>')
});

app.get('/profile',(req, res) => {
    if (req.isAuthenticated()) {
        // Access user data using req.user
        res.send(`<h1 style="text-align: center;"> Welcome, <span style =" color: blue;">${req.user.displayName}</span>!</h1>`);
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send(`<h1 style="text-align: center;">Good Bye <span style =" color: blue;">${req.user.displayName}</span> You need to Login Again ;)</h1>`)
});

//////////////////////////////////////////////////////////////////////////////
//Start the Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});