const pg = require("pg");
var promise = require("promise");

exports.getdata = (text, para) => {
  return new Promise((resolve, reject) => {
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
      client.query(text, para, (err, result) => {
        if (err) {
          return console.error("error running query", err);
        } else {
          resolve(result.rows);
        }
        client.end();
      });
    });
  });
};
