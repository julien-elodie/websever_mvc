const express = require("express");
const promise = require("promise");
const dbController = require("../../controllers/database");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("video");
});

router.post("/", (req, res, next) => {
    const id = req.body.id;
    console.log("request id: " + id);
    
    const item = "*,to_char(date,'yyyy-mm-dd hh24:mi:ss') as date"
    const text = "select " + item + " from videoinfo where id = " + id + ";"
    const para = [];
    dbController.getVideoData(text, para).then(result => {
        // res.send(result[0]);
        res.render("video", {video: result[0]});
    });
});

module.exports = router;