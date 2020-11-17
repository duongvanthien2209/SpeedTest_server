const Response = require('../helpers/Response');
const Text = require('../models/text.model');

module.exports.getRandomText = async (req, res) => {
  try {
    const texts = await Text.find();
    Response.success(res, {
      text: texts[Math.floor(Math.random() * 100)].text,
    });
  } catch (error) {
    Response.error(res, {
      message: 'Có lỗi xảy ra',
    });
  }
};
