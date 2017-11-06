const express = require("express");
const dbController = require("../../controllers/database");
const router = express.Router();

router.get("/", (req, res, next) => {
  const items = "title,to_char(date,'yyyy-mm-dd hh24:mi:ss') as date,username,content,plays,comments,coins,collects"
  const text = "select "+ items +" from videoinfo limit $1 offset $2;";
  const para = [5, 0];
  dbController.getVideoData(text, para).then(result => {
    // res.send(result);
    res.render("master", { videos : result });
  });
});

module.exports = router;
