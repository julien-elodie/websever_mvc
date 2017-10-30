const pg = require("pg");

exports.getData = (text, para, result) => {
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
