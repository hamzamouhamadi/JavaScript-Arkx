const express = require('express');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
//////////////////////////////////////////////////////////////////////
const app = express();
app.use(express.json())
//////////////////////////////////////////////////////////////////////
// Configure session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));
//////////////////////////////////////////////////////////////////////
// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());
//////////////////////////////////////////////////////////////////////
// Sample user database
const users = [
  { id: 1, username: 'user1', password: 'password1', email: 'user1@example.com' },
  { id: 2, username: 'user2', password: 'password2', email: 'user2@example.com' }
];
//////////////////////////////////////////////////////////////////////
// Configure Passport local strategy for authentication
passport.use(new LocalStrategy(
  function(username, password, done) {
    const user = users.find(user => user.username === username && bcrypt.compareSync(password,user.password));
    if (!user) {
      return done(null, false, { message: 'Incorrect username or password' });
    }
    return done(null, user);
  }
));
//////////////////////////////////////////////////////////////////////
// Serialize user object to store in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//////////////////////////////////////////////////////////////////////
// Deserialize user object from the session
passport.deserializeUser((id, done) => {
  const user = users.find(user => user.id === id);
  done(null, user);
});
//////////////////////////////////////////////////////////////////////
// Route to handle user login
app.post('/register',(req, res) => {
  let {username, password ,email} = req.body
  let id = users.length+1;
  let hashedPass = bcrypt.hashSync(password,10)
  users.push({id,username,password :hashedPass,email})
  res.send(users)
});
//////////////////////////////////////////////////////////////////////
//Route of Login
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('Login successful');
});
//////////////////////////////////////////////////////////////////////
// Route to access user information after authentication
app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome ${req.user.username} ${req.user.email}`);
  } else{
    res.send("You are not Authenticated")
  }
});
//////////////////////////////////////////////////////////////////////
// Route of  Update Profile
app.put('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    let ID = req.user.id
    let {username, password ,email} = req.body
    let hashedPass = bcrypt.hashSync(password,10)
    let user = users.findIndex(u=>u.id === ID)
    let UpdatedUser = {
      id :ID,
      username,
      password : hashedPass,
      email
    }
    users[user] = UpdatedUser;
    res.send(users);
  } else{
    res.send("You are not authentfied")
  }
});
//////////////////////////////////////////////////////////////////////
// Log out Route
app.post('/logout',(req,res)=>{
  req.session.destroy();
  res.send('You loged out')
})
//////////////////////////////////////////////////////////////////////
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})