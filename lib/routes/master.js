const express = require("express");
const dbController = require("../../controllers/database");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("master");
});

router.get("/videodata", (req, res, next) => {
  const text = "select count(1) from videoinfo;"
  const para = [];
  dbController
    .getVideoData(text, para)
    .then(rownumber => {
      const items = "id,title,to_char(date,'yyyy-mm-dd hh24:mi:ss') as date,username,plays,comments,c" +
          "oins,collects"
      const text = "select " + items + " from videoinfo limit $1 offset $2;";
      const para = [req.query.limit, req.query.offset];
      dbController
        .getVideoData(text, para)
        .then(result => {
          res.send({
            "total": rownumber[0].count,
            "rows": result.slice(0, req.query.limit)
          });
        });
    });
});

router.post("/delete", (req, res, next) => {
  var ids = req.body.ids;
  const text = "delete from videoinfo using (values (" + ids.join("),(") + ")) as tmp(id) where videoinfo.id = tmp.id;"
  const para = [];
  dbController
    .deleteVideoData(text, para)
    .then(result => {
      res.send(req.body);
    });
});

router.post("/add", (req, res, next) => {
  console.log(req.body);
  res.send(req.body);
});

module.exports = router;
