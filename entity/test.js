var $sql = require('../entity/sql/SqlMapping');
var con = require('../lib/db/connection.js');

module.exports = {
    queryAll: function (req, res, next) {
        con.query(req, res, $sql.test.queryAll, "", function (retu, result) {
            retu.code = 1;
            retu.value = result;
            return retu;
        });
    },
    insert: function (req, res, next) {
        // console.log(req.body);
        var param = [req.body.user, req.body.password, req.body.sex, req.body.address];
        con.pool.getConnection(function (err, connection) {
            connection.query($sql.test.insert, param, function (err, result) {
                con.jsonWrite(res, err, result);
                connection.release();
            });
        });
    }
};
// function (req, res, next) {
//         // 从链接池里得到connection
//         con.pool.getConnection(function (err, connection) {
//             connection.query($sql.test.queryAll, function (result) {
//                 // console.log(res);
//                 con.jsonWrite(res, err, result);
//                 connection.release();
//             });
//         });
        // pool.getConnection(function (err, connection) {
        //     if (err) {
        //         console.error('mysql 链接失败');
        //         return callback(err, null);
        //     }
        //     // 开始事务
        //     connection.beginTransaction(function (err) {
        //         if (err) {
        //             throw err;
        //         }
        //         async.parallel([
        //             function (callback) {
        //                 connection.query($sql.test.queryAll, callback);
        //             },
        //             function (callback) {
        //                 connection.query("执行sql，添加任务时间区段", callback);
        //             }
        //         ], function (err, result) {
        //             if (err) {
        //                 connection.rollback(function () {
        //                     throw err;
        //                 });
        //                 return;
        //             }
        //             // 提交事务
        //             connection.commit(function (err) {
        //                 if (err) {
        //                     connection.rollback(function () {
        //                         throw err;
        //                     });
        //                 }
        //                 console.log('success!');
        //             });
        //         });
        //     });
        // });
    // },