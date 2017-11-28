const promise = require("promise");
const userModel = require("../models/user");
const videoModel = require("../models/video")

exports.getUserData = (text, para) => {
  return new Promise((resolve, reject) => {
    userModel.getData(text, para, result => {
      resolve(result);
    });
  });
};

exports.userVerify = (user, pass) => {
  return new Promise((resolve, reject) => {
    userModel.verify(user, pass, result => {
      resolve(result);
    });
  });
};

exports.getVideoData = (text, para) => {
  return new Promise((resolve, reject) => {
    videoModel.getData(text, para, result => {
      resolve(result);
    });
  });
};

exports.processVideoData = (text, para) => {
  return new Promise((resolve, reject) => {
    videoModel.getData(text, para, result => {
      resolve(result);
    });
  });
};