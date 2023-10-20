//配置路由
var express = require('express');
var router = express.Router();
const {findNotices} = require('../controllers/NoticeController')
// 查询所有试卷类型
router.post('/findNotices',findNotices);

module.exports = router;