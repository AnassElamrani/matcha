const chat = require('../models/chat');

exports.Test = async (req, res) => {
    await chat.test().then((res) => {
        console.log('test', res[0]);
    })
}