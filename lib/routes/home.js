const express = require("express");
const promise = require("promise");
const dbController = require("../../controllers/database");
const router = express.Router();

router.get("/", (req, res, next) => {
  if (req.session.user) {
    var user = req.session.user;
    console.log('User '+ user.username +' login!');
    
    const items = "imgsrc,id,title,to_char(date,'yyyy-mm-dd hh24:mi:ss') as date,username,content,plays,comments,coins,collects"
    const text = "select "+ items +" from videoinfo limit $1 offset $2;";
    const para = [5, 0];
    dbController.getVideoData(text, para).then(result => {
      // res.send(result);
      res.render("home", { videos : result });
    });
  } else {
    res.set('refresh', '2;url=../login');
    res.send('please login first!');
  }
});

module.exports = router;