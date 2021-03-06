/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const fs = require('promise-fs');
const uploadImage = require('../helpers/handleCloudinary');

const User = require('../models/user.model');
const History = require('../models/history.model');

const Response = require('../helpers/Response');

module.exports.postCreate = async (req, res) => {
  const { name, score, accuracy } = req.body;
  const { file } = req;

  if (!name || !score) {
    Response.error(res, {
      message: 'Có lỗi xảy ra',
    });
    return;
  }

  try {
    const user = await User.findOne({
      name,
    });

    let avatar = 'https://picsum.photos/200/300';
    if (file) {
      let orgName = file.originalname || '';
      orgName = orgName.trim().replace(/ /g, '-');
      const fullPathInServ = file.path;
      const newFullPath = `${fullPathInServ}-${orgName}`;
      fs.rename(fullPathInServ, newFullPath);

      // Upload lên cloudinary
      avatar = await uploadImage(newFullPath);
    }

    if (!user) {
      const newUser = new User({
        name,
        avatar,
      });
      await newUser.save();

      const history = new History({
        userId: newUser._id,
        score: parseInt(score, 10),
        accuracy: parseInt(accuracy, 10),
        dateCreate: new Date(),
      });

      await history.save();

      Response.success(res, {
        message: 'Tạo thành công',
        user: await User.findById(newUser._id),
      });
    } else {
      user.avatar = file ? avatar : user.avatar;
      await user.save();

      const history = new History({
        userId: user._id,
        score: parseInt(score, 10),
        accuracy: parseInt(accuracy, 10),
        dateCreate: new Date(),
      });

      await history.save();

      Response.success(res, {
        message: 'Tạo thành công',
        user: await User.findById(user._id),
      });
    }
  } catch (error) {
    console.error(error);
    Response.error(res, {
      message: 'Có lỗi xảy ra',
    });
  }
};

module.exports.getLeaderBoard = async (req, res) => {
  try {
    const historys = await History.find()
      .populate('userId')
      .sort({
        score: -1,
        accuracy: -1,
      })
      .limit(10);

    Response.success(res, {
      users: historys,
    });
  } catch (error) {
    console.error(error);
    Response.error(res, {
      message: 'Có lỗi xảy ra',
    });
  }
};

module.exports.getHistory = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      throw new Error('Có lỗi xảy ra');
    }

    const user = await User.findById(id);
    const historys = await History.find({ userId: user._id }).sort({ dateCreate: -1 });

    Response.success(res, {
      historys,
    });
  } catch (error) {
    console.error(error);
    Response.error(res, {
      message: 'Có lỗi xảy ra',
    });
  }
};
