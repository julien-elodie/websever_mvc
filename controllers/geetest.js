var gt = require("../models/gt");

exports.register = (req, res) => {
  gt.register(null, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500);
      res.send(err);
      return;
    }

    if (!data.success) {
      req.session.failback = true;
      res.send(data);
    } else {
      req.session.failback = false;
      res.send(data);
    }
  });
};

exports.validate = (req, res) => {
  gt.validate(
    req.session.failback,
    {
      geetest_challenge: req.body.geetest_challenge,
      geetest_validate: req.body.geetest_validate,
      geetest_seccode: req.body.geetest_seccode
    },
    (err, success) => {
      if (err) {
        res.send({
          status: "error",
          info: err
        });
      } else if (!success) {
        res.send({
          status: "fail",
          info: "登录失败"
        });
      } else {
        var user = {
          username: req.body.username
        };
        req.session.user = user;
        res.send({
          status: "success",
          info: "登录成功"
        });
      }
    }
  );
};
