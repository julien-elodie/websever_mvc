const express = require("express");
const gtController = require('../../controllers/geetest');
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("login");
});

router.get("/validate", (req, res, next) => {
  gtController.register(req, res);
});

router.post("/validate", (req, res) => {
  gtController.validate(req, res);
});

module.exports = router;
