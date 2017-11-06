const express = require("express");
const dbController = require("../../controllers/database");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("master");
});

router.get("/videodata", (req, res, next) => {
  const text = "select count(1) from videoinfo;"
  const para = [];
  dbController.getVideoData(text, para).then(rownumber => {
    const items = "id,title,to_char(date,'yyyy-mm-dd hh24:mi:ss') as date,username,plays,comments,coins,collects"
    const text = "select "+ items +" from videoinfo limit $1 offset $2;";
    const para = [req.query.limit, req.query.offset];
    dbController.getVideoData(text, para).then(result => {
      res.send({
        "total": rownumber[0].count,
        "rows": result.slice(0,req.query.limit),
      });
    });
  });
});

module.exports = router;
