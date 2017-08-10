var mysql = require('mysql');
var config = require('../config');

// 使用连接池，提升性能
var pool = mysql.createPool(config.mysql);


var query = function (req, res, sqlstr, param, callback) {
    pool.getConnection(function (err, connection) {
        connection.query(sqlstr, param, function (err, result) {
            var s = "";
            if(err){
                s = {code:err.errno,message:err.code,value:""};
            }else{
                s = callback({code:0,message:"",value:""},result);
            }
            res.json(s);
        });
    });
};

module.exports = {
    query: query
};