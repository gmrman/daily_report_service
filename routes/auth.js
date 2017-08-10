var config=require("../lib/config");
var config=require("../lib/token/token");

module.exports = function(req, res, next) {

    var path = req._parsedUrl.path;
    console.log(path);
    var paths = path.split("/");
    console.log(req.headers);
    if(paths[1]!="login"){
        next();
        // res.status(403);
        // res.send({ status: 0, message: "error" });
    }else{
        console.log("token:",req.headers.token);
        next();
    }
};