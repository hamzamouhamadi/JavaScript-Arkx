const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { check, validationResult } = require('express-validator');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Sample Vulnerable Node.js Application');
});

app.get('/login', (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form action="/login" method="POST">
      <input type="text" name="username" placeholder="Username" ><br>
      <input type="password" name="password" placeholder="Password" ><br>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', 
    check('username').notEmpty().withMessage( 'Please enter username' ).isLength({min : 5}).withMessage('Username should be at least 5 characters long').trim().escape(),
    check('password').notEmpty().withMessage('Please enter password'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    req.session.authenticated = true;
    req.session.username = username;
    res.redirect('/profile');
  } else {
    res.send('Invalid username or password');
  }
});

app.get('/profile', (req, res) => {
  if (req.session.authenticated) {
    res.send(`<h1>Welcome to your profile, ${req.session.username}</h1>`);
  } else {
    res.redirect('/login');
  }
});

// Server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
