const express = require("express");
const session = require("express-session")
var app = express();

app.use(express.json());
/////////////////////////////////////////////////////////////////////////////////
// Declare database
const users = [
    {
      username: 'hamza',
      password: 'pass1',
    },
    {
        username: 'mohamed',
        password: 'pass2',
    }
];
/////////////////////////////////////////////////////////////////////////////////
//Create a session
app.use(
    session({
      secret: 'mySecretKey', // Secret key used to sign the session ID cookie
      resave: false, // Whether to save the session for every request, even if it hasn't changed
      saveUninitialized: true // Whether to save uninitialized sessions (new but not modified)
    })
);
/////////////////////////////////////////////////////////////////////////////////
//Route of register
app.post('/register',(req,res)=>{
    const{username,password} = req.body;
    users.push({username,password});
    res.json({NewUser : users})
});
/////////////////////////////////////////////////////////////////////////////////
// Router of login
app.post('/login',(req,res)=>{
    const{username,password} = req.body;
    let user = users.find((u) => u.username == username && u.password == password) ;
    if (!user){ res.status(400).send('Invalid Username or password');}
    else{
        req.session.username = username;
        res.json({USER : user})
    }
});
/////////////////////////////////////////////////////////////////////////////////
// Declare an auth middleware
function auth(req,res,next) {
    const session = req.session.username;
    if(!session){
      res.status(403).json({message : "You need to log in"});
      return;
    }
    next();
}
/////////////////////////////////////////////////////////////////////////////////
// Route of profile with authentication
app.get('/profile',auth,(req,res)=>{
      res.send(`Welcome ${req.session.username} !!`);
});
app.get('/post',auth,(req,res)=>{
  res.send(`Welcome ${req.session.username} !!`);
});
app.get('/comments',auth,(req,res)=>{
  res.send(`Welcome ${req.session.username} !!`);
});

/////////////////////////////////////////////////////////////////////////////////
// Logout route
app.post('/logOut', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.json({ message: "Session not found" });
      return;
    }
    res.json({message : "Logged out successfully" })
  });
});

/////////////////////////////////////////////////////////////////////////////////
//Listen a server
app.listen(3000 , ()=> console.log("Server is running on port 3000"));