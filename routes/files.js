//配置路由
var express = require('express');
var router = express.Router();
const {fileUp,updateHeadImg} = require('../controllers/FilesController')
//1. 文件上传，请求方式一定是post
router.post('/fileUp',fileUp);
// 确认修改
router.post('/updateHeadImg',updateHeadImg);
module.exports = router;