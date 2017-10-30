const express = require("express");
const promise = require("promise");
const dbController = require("../controllers/database");
const router = express.Router();

router.get("/", (req, res, next) => {
  const text = "select * from userinfo where username = $1 and password = $2;";
  const para = ["wizard", "000000"];
  dbController.getdata(text, para).then(result => {
    res.send(result);
  });
});

module.exports = router;
