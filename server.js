const express = require('express');
const path = require('path');
var session = require('express-session');

const app = express();

// routes
const router = require('./lib/router');
const login = require('./lib/routes/login')
const home = require('./lib/routes/home')

// views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// public
app.use('/public', express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  secret: 'user',
  cookie: {
      maxAge: 60*60*1000, // 一小时
  },
  resave: true,
  saveUninitialized: true,
}));

// router
app.use('/', router);
app.use('/login', login);
app.use('/home', home);

// server
const server = app.listen(3000, () => {
  console.log('server start');
});