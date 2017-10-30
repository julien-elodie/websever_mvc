const promise = require("promise");
const userModel = require('../models/user');

exports.getUserData = (text, para) => {
  return new Promise((resolve, reject) => {
    userModel.getData(text, para, (result) => {
      resolve(result);
    });
  });
};
