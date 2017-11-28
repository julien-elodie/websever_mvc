const express = require("express");
const promise = require("promise");
const dbController = require("../../controllers/database");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("master");
});

router.get("/videodata", (req, res, next) => {
  var text = "select count(1) from videoinfo;";
  var para = [];
  dbController
    .getVideoData(text, para)
    .then(rownumber => {
      const items =
        "id,title,to_char(date,'yyyy-mm-dd hh24:mi:ss') as date,username,plays,comments,c" +
        "oins,collects";
      if (req.query.value !== "") {
        text =
          "select " +
          items +
          " from videoinfo where to_char(id,'999999999') like '%'||ltrim(to_char(" +
          req.query.value +
          ",'999999999'))||'%' limit $1 offset $2;";
      } else {
        text = "select " + items + " from videoinfo limit $1 offset $2;";
      }
      return new Promise((resolve, reject) => {
        data = {};
        data.rownumber = rownumber;
        data.text = text;
        resolve(data);
      });
    })
    .then(data => {
      para = [req.query.limit, req.query.offset];
      dbController.getVideoData(data.text, para).then(result => {
        res.send({
          total: data.rownumber[0].count,
          rows: result.slice(0, req.query.limit)
        });
      });
    });
});

router.post("/delete", (req, res, next) => {
  var ids = req.body.ids;
  const text =
    "delete from videoinfo using (values (" +
    ids.join("),(") +
    ")) as tmp(id) where videoinfo.id = tmp.id;";
  const para = [];
  dbController.processVideoData(text, para).then(result => {
    res.send(req.body);
  });
});

router.post("/add", (req, res, next) => {
  var data = req.body;
  const text =
    "insert into videoinfo (id, title, date, username, plays, comments, coins, collec" +
    "ts, videosrc, imgsrc, userimgsrc) values ($1, $2, $3, $4, $5, $6, $7, $8, 'TODO'" +
    ", 'TODO', 'TODO');";
  const para = [
    data.id,
    data.title,
    data.date,
    data.username,
    data.plays,
    data.comments,
    data.coins,
    data.collects
  ];
  dbController.processVideoData(text, para).then(result => {
    res.send(req.body);
  });
});

router.get("/selectIds", (req, res, next) => {
  const text =
    "select id from videoinfo where to_char(id,'999999999') like '%'||ltrim(to_char(" +
    req.query.q +
    ",'999999999'))||'%';";
  const para = [];
  dbController.getVideoData(text, para).then(results => {
    var processed = [];
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      var item = {};
      item.id = i + 1;
      item.name = result.id;
      item.text = result.id;
      processed.push(item);
    }
    var result = {};
    result.items = processed;
    result.total_count = processed.length;
    res.send(result);
  });
});

router.post("/update", (req, res, next) => {
  var data = req.body;
  const text = "update videoinfo set " + data.attr + " = $1 where id = $2;";
  const para = [data.value, data.id];
  dbController.processVideoData(text, para).then(result => {
    res.send(req.body);
  });
});

module.exports = router;
