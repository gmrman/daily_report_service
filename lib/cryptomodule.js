var crypto=require("crypto");
var config=require("../lib/config");
//添加签名，防篡改
var secret=config.secret;
var cryptoModule={
    createCrypto:function(password){

        // var base64Str=Buffer.from(password,"utf8").toString("base64");

        // var hash=crypto.createHmac('sha256',secret);
        //     hash.update(base64Str);
        // var signature=hash.digest('base64');

        // return  signature;
        const cipher = crypto.createCipher('aes192', secret);
        var crypted = cipher.update(password, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    },
    decodeCrypto:function(signature){

        // var password="";
        // //将payload json字符串 解析为对象
        // try{
        //     password=Buffer.from(signature,"base64").toString("utf8");
        // }catch(e){
        //     return false;
        // }

        // //检验签名       
        // var hash=crypto.createHmac('sha256',secret);
        //     hash.update(signature);
        // var checkSignature=hash.digest('base64');

        // return checkSignature;
        const decipher = crypto.createDecipher('aes192', secret);
        var decrypted = decipher.update(signature, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}
module.exports = cryptoModule;