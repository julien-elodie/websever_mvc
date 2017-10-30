const express = require('express');
const path = require('path');
const router = require('./lib/router');
const app = express();

// views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// public
app.use(express.static(path.join(__dirname, 'public')));

// router
app.use('/', router)

// server
const server = app.listen(3000, () => {
  console.log('server start');
});