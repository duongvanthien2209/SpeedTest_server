const shortid = require("shortid");
const User = require("../../models/user.model");
const History = require("../../models/history.model");

// Cloudinary - Dùng để upload file lên cloud
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// const db = require('../../db');
const Response = require("../../helpers/Response");

module.exports.postCreate = async (req, res) => {
  let { name, score } = req.body;
  let file = req.file;

  if (!name || !score) {
    Response.error(res, {
      message: "Có lỗi xảy ra",
    });
    return;
  }

  try {
    let user = await User.findOne({
      name,
    });

    let avatar = "https://picsum.photos/200/300";
    if (file) {
      let result = await cloudinary.uploader.upload(req.file.path);
      avatar = result.url;
    }

    if (!user) {
      let newUser = new User({
        name,
        avatar,
      });
      await newUser.save();

      let history = new History({
        userId: newUser._id,
        score: parseInt(score),
        dateCreate: new Date(),
      });

      await history.save();
    } else {
      user.avatar = file ? avatar : user.avatar;
      await user.save();

      let history = new History({
        userId: user._id,
        score: parseInt(score),
        dateCreate: new Date(),
      });

      await history.save();
    }

    Response.success(res, {
      message: "Tạo thành công",
      user: await User.findById(user._id),
    });
  } catch (error) {
    Response.error(res, {
      message: "Có lỗi xảy ra",
    });
    return;
  }
};

module.exports.getLeaderBoard = async (req, res) => {
  try {
    let result = [];
    let historys = await History.find()
      .sort({
        score: -1,
        dateCreate: -1,
      })
      .limit(10);

    for (let item of historys) {
      let user = await User.findById(item.userId);

      result.push({
        ...item._doc,
        name: user.name,
        avatar: user.avatar,
      });
    }

    Response.success(res, {
      users: result,
    });
  } catch (error) {
    Response.error(res, {
      message: "Có lỗi xảy ra",
    });
    return;
  }
};

module.exports.getHistory = async (req, res) => {
  let { id } = req.params;

  try {
    if (!id) {
      throw new Error("Có lỗi xảy ra");
      return;
    }

    // let user = await User.findById(id);
    let historys = await History.find({ userId: id });

    Response.success(res, {
      historys,
    });
  } catch (error) {
    Response.error(res, {
      message: "Có lỗi xảy ra",
    });
    return;
  }

  // let user = db.get('users').find({
  //     name
  // }).value();
};
