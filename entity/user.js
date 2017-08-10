var $sql = require('../entity/sql/SqlMapping');
var con = require('../lib/db/connection');
var cocryptoModule = require('../lib/cryptomodule');
var $token = require('../lib/token/token');

module.exports = {
    checkpass: function (req, res, next) {
        var param  = [req.id];
        con.query(req, res, $sql.user.logIn,param,function(retu, result){
            if(result!="undefined" && result.length>0){
                var s = result[0];
                //判断查询密码是否一致
                if(cocryptoModule.createCrypto(req.password)!=s.password){
                    retu.message = "用户密码错误！";
                }else{
                    retu.code = 1;
                    s.token = $token.createToken(s.id,1800);//单位秒
                    retu.value = s;
                }
            }else{
                retu.message = "该用户ID不存在！";
            }
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