var express = require('express');
var router = express.Router();

const {login,register,modify,getUserInfo,statistics} = require('../controllers/UserController')

// 1. 登录
router.post('/login',login)
// 2. 注册
router.post('/register',register)
// 3. 解析token获取用户信息
router.get('/getUserInfo',getUserInfo)
// 4. 修改头像，姓名，性别
router.post('/modify',modify)
// 统计学生数据 练习题数 学习天数 最近考试 平均分数
router.post('/statistics',statistics)

module.exports = router;
