// Cloudinary - Dùng để upload file lên cloud
const cloudinary = require('cloudinary').v2;

const User = require('../../models/user.model');
const History = require('../../models/history.model');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const Response = require('../../helpers/Response');

module.exports.postCreate = async (req, res) => {
  const { name, score } = req.body;
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
      const result = await cloudinary.uploader.upload(req.file.path);
      avatar = result.url;
    }

    if (!user) {
      const newUser = new User({
        name,
        avatar,
      });
      await newUser.save();

      const history = new History({
        userId: newUser.id.toString(),
        score: parseInt(score, 10),
        dateCreate: new Date(),
      });

      await history.save();
    } else {
      user.avatar = file ? avatar : user.avatar;
      await user.save();

      const history = new History({
        userId: user.id.toString(),
        score: parseInt(score, 10),
        dateCreate: new Date(),
      });

      await history.save();
    }

    Response.success(res, {
      message: 'Tạo thành công',
      user: await User.findById(user.id.toString()),
    });
  } catch (error) {
    Response.error(res, {
      message: 'Có lỗi xảy ra',
    });
  }
};

module.exports.getLeaderBoard = async (req, res) => {
  try {
    const result = [];
    const historys = await History.find()
      .sort({
        score: -1,
        dateCreate: -1,
      })
      .limit(10);

    // eslint-disable-next-line no-restricted-syntax
    for (const item of historys) {
      // eslint-disable-next-line no-await-in-loop
      const user = await User.findById(item.userId);

      result.push({
        // eslint-disable-next-line no-underscore-dangle
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

    const historys = await History.find({ userId: id });

    Response.success(res, {
      historys,
    });
  } catch (error) {
    Response.error(res, {
      message: 'Có lỗi xảy ra',
    });
  }
};
