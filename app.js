var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var $route = require('./route');
var $token = require('./lib/token/token');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.cookieParser());//开启cookie
// app.use(express.session({//开启session
//   secret: config.secret
// }));
app.use(function (req, res, next) {
  if(req.method == "OPTIONS"){
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","access-control-allow-origin,content-type,token");
    res.end();
  }else{
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","access-control-allow-origin,content-type,token");
    next();
  }
});

app.use(function (req, res, next) {
  var path = req._parsedUrl.path;
  console.log(path);
  var paths = path.split("/");
  // console.log(req.headers);
  if (paths[1] != "login") {//不是登录检验token
    var req_token = req.headers.token;
    if ($token.checkToken(req_token)) {
      next();
    } else {
      var err = new Error('API Forbiden');
      err.status = 403;
      next(err);
    }
  } else {
    next();
  }
});

//加载需要处理的js
// console.log("所有的接口：");
for (var s in $route) {
  app.use('/' + s, require($route[s]));
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  // res.render('error');
  res.send({ status: 0, message: "error" });
});

module.exports = app;
