const express = require("express");
const promise = require("promise");

const router = express.Router();

router.get("/", (req, res, next) => {
  if (req.session.user) {
    var user = req.session.user;
    console.log('User '+ user.username +' login!');
    res.send('home');
  } else {
    res.set('refresh', '2;url=../login');
    res.send('please login first!');
  }
});

module.exports = router;