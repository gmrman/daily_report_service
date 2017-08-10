var express = require('express');
var router = express.Router();
var book= require('../entity/test');
// var purchrse= require('../http/purchrse');
/* 有关spah的操作*/
//获取全部的有关信息
router.post('/queryAll', function(req, res, next) {
    book.queryAll(req, res, next);
});
//插入一条test数据
router.post('/insert', function(req, res, next) {
    book.insert(req, res, next);
});

module.exports = router;