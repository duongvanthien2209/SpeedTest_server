const db = require('../../db');
const Response = require('../../helpers/Response');

module.exports.getRandomText = (req, res) => {
    let texts = db.get('texts').value();

    Response.success(res, { text: texts[Math.floor(Math.random()*100)].text });
}