const chatController = require("../controllers/chat");
// const validator = require("../controllers/validator");
// const authVrfy = require("../middleware/autMiddleware");
// const Helpers = require("../util/Helpers");

const express = require("express");
const route = express.Router();

route.get('/sayHello', (req, res, next) => {
    res.json({msg: 'hello'});
    next();
}, chatController.Test)

module.exports = route;