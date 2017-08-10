var express = require('express');
var router = express.Router();
var user= require('../entity/user');
//查看登录密码
router.post('/checkpass', function(req, res, next) {
    console.log(req.body);
    user.checkpass(req.body, res, next);
});

module.exports = router;