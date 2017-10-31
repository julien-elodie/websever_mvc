const express = require("express");
const dbController = require("../../controllers/database");
const gtController = require("../../controllers/geetest");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("login");
});

router.get("/validate", (req, res, next) => {
  gtController.register(req, res);
});

router.post("/validate", (req, res) => {
  dbController.userVerify(req.body.username, req.body.password).then(result => {
    if (result == "success") {
      console.log("login success");
      gtController.validate(req, res);
    } else {
      console.log("login fail");
      res.send({
        status: "fail",
        info: "登录失败"
      });
    }
  });
});

module.exports = router;
