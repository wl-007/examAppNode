var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 引入
require("./models/db/MongoDB");
var csRouter = require('./routes/cs');
var filesRouter=require('./routes/files')
var noticesRouter = require('./routes/notices');
var collectionsRouter = require('./routes/collections')
var errorsRouter = require('./routes/errors');
// var moviesRouter = require('./routes/movies'); 
var testsRouter = require('./routes/tests');
var usersRouter = require('./routes/users');
// var operasRouter = require('./routes/operas');
// var ordersRouter=require('./routes/orders');


const {getSecret} = require('./utils/Utils');
var app = express();
// CORS 配置跨域
var allowCrossDomain = function (req, res, next) {
    // 设置允许跨域访问的请求源（* 表示接受任意域名的请求）   
    res.header("Access-Control-Allow-Origin", "*");
    // 设置允许跨域访问的请求头
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept,Authorization");
    // 设置允许跨域访问的请求头
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,content-Type,accept,authorization");
    // 设置允许跨域访问的请求类型
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
     // 运行前端从请求头中配置token信息
    // 同意 cookie 发送到服务器（如果要发送cookie，Access-Control-Allow-Origin 不能设置为星号）
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};
// app.use(allowCrossDomain);
const secret=getSecret();
// 认证Token
const {expressjwt} = require('express-jwt')
const jwtAuth = expressjwt({
    secret, //秘钥 与登录时的秘钥一致
    algorithms:['HS256'], //jwt的验证算法
    //前端如果没有发送token过来，也会直接返回401的状态
    //false代表验证是否包含token
    credentialsRequired:true
}).unless({
    //用于配置不需要身份认证的接口
    path:[
        /\/login/,/\/reg/,/\/temp/,/\/findTestsType/,/\/findNotices/
    ]
})
// app.use(jwtAuth);  //启用验证
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public",express.static(path.join(__dirname, 'public')));

app.use('/cs', csRouter);
app.use('/files', filesRouter);

app.use('/notices', noticesRouter);
app.use('/collections', collectionsRouter);
app.use('/users', usersRouter);
app.use('/tests', testsRouter);
app.use('/errors', errorsRouter);
// app.use('/movies', moviesRouter);
// app.use('/operas', operasRouter);
// app.use('/orders', ordersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
const port=8088;
app.listen(port,()=>{
  console.log("服务已启动，端口号为"+port);
})

