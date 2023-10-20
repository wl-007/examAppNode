// 导入 mongoose 模块
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
// 设置默认 mongoose 连接
// const mongoDB = 'mongodb://192.168.14.72:27017/examApp'; // 局域网
const mongoDB = 'mongodb://127.0.0.1:27017/examApp';  //本地库
mongoose.connect(mongoDB, (err) => {
    if (!err) {
        console.log("movieApp数据库链接成功")
    } else {
        console.log("movieApp数据库链接失败")
    }
}
);

/**
// 让 mongoose 使用全局 Promise 库
mongoose.Promise = global.Promise;
// 取得默认连接
const db = mongoose.connection;

// 将连接与错误事件绑定（以获得连接错误的提示）
db.on('error', console.error.bind(console, 'MongoDB 连接错误：')); 
 */