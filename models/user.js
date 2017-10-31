const pg = require("pg");

var getData = (text, para, result) => {
  const config = {
    user: "julien-elodie",
    database: "videoinfodb",
    password: "wyq2644756656",
    port: "5432"
  };
  const client = new pg.Client(config);
  client.connect(err => {
    if (err) {
      console.log("connect error");
      return res.sendStatus(500);
    }
    client.query(text, para, (err, res) => {
      if (err) {
        return console.error("error running query", err);
      } else {
        result(res.rows);
      }
      client.end();
    });
  });
};

exports.getData = getData;

exports.verify = (user, pass, result) => {
  const text = "select * from userinfo where username = $1 and password = $2;";
  const para = [user, pass];
  getData(text, para, res => {
    if (JSON.stringify(res) === '[]') {
      result("fail");
    } else {
      result("success");
    }
  });
};
