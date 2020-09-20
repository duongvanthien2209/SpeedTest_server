const shortid = require('shortid');

const db = require('../../db');
const Response = require('../../helpers/Response');

module.exports.postCreate = (req, res) => {
    let { name, score } = req.body;
    let file = req.file;

    if (!name || !score) {
        Response.error(res, { message: 'Có lỗi xảy ra' });
        return;
    }

    let user = db.get('users').find({ name }).value();

    let avatar = file ? file.path.split('\\').slice(1).join('/') : 'https://picsum.photos/200/300';
    if (!user) {
        db.get('users').push({ id: shortid.generate(), name, avatar, history: [{ id: shortid.generate(), score: parseInt(score), dateCreate: new Date() }] }).write();
    } else {
        db.get('users').find({ name }).assign({ avatar: file ? avatar : user.avatar, history: [...user.history, { id: shortid.generate(), score: parseInt(score), dateCreate: new Date() }] }).write();
    }

    Response.success(res, { message: 'Tạo thành công', user: db.get('users').find({ name }).value() });
}

module.exports.getLeaderBoard = (req, res) => {
    let users = db.get('users').value();
    let results = [];

    users.forEach(item => {
        item.history.forEach(item1 => results.push({ ...item1, name: item.name, avatar: item.avatar }));
    });

    results.sort((item1, item2) => {
        if (item1.score === item2.score) {
            return item2.dateCreate.getTime() - item1.dateCreate.getTime();
        }

        return item2.score - item1.score;
    });

    Response.success(res, { users: results.slice(0, 10) });
}

module.exports.getHistory = (req, res) => {
    let { id } = req.query;

    if (!id) {
        Response.error(res, { message: 'Có lỗi xảy ra' });
        return;
    }

    let user = db.get('users').find({ name }).value();

    Response.success(res, { user });
}