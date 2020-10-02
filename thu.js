const Text = require('./models/text.model');
const db = require('./db');

const updateText = async() => {
    let texts = db.get('texts').find().value();

    try {
        await Promise.all(texts.map(item => {
            let text = new Text({ text: item.text });
            return text.save();
        }));
        
        console.log('Thành công');
    } catch (error) {
        console.log('Có lỗi xảy ra');
        return;   
    }
};

updateText();